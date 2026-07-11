using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using ReforgedRecovery.Api.Data;
using ReforgedRecovery.Api.Models;
using ReforgedRecovery.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Configuration ──────────────────────────────────────────────────────────
builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection(EmailOptions.SectionName));

// ── Database (provider switch) ─────────────────────────────────────────────
// Dev default is SQLite so the stack runs with zero setup. Production sets
// Database:Provider = "Postgres" and a ConnectionStrings:Default value.
var dbProvider = builder.Configuration["Database:Provider"] ?? "Sqlite";
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (dbProvider.Equals("Postgres", StringComparison.OrdinalIgnoreCase))
    {
        options.UseNpgsql(connectionString);
    }
    else
    {
        // Local file-based DB; created automatically on first run.
        options.UseSqlite(connectionString ?? "Data Source=reforged.db");
    }
});

// ── Email service (provider switch) ────────────────────────────────────────
var emailProvider = builder.Configuration[$"{EmailOptions.SectionName}:Provider"] ?? "Console";
switch (emailProvider.ToLowerInvariant())
{
    case "sendgrid":
        builder.Services.AddHttpClient<IEmailService, SendGridEmailService>();
        break;
    case "smtp":
        builder.Services.AddScoped<IEmailService, SmtpEmailService>();
        break;
    default:
        builder.Services.AddScoped<IEmailService, ConsoleEmailService>();
        break;
}

// ── CORS ───────────────────────────────────────────────────────────────────
// Allowed origins come from config (Cors:AllowedOrigins). Dev falls back to the
// Vite dev server. In production the client is usually same-origin behind a
// reverse proxy, but set this if the API is on a separate domain.
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:5173" };
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod());
});

// ── Rate limiting ──────────────────────────────────────────────────────────
// Spam/abuse protection on the public form endpoint: max 5 submissions per
// minute per client IP, plus a small queue. Returns HTTP 429 when exceeded.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("form-submit", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            }));
});

builder.Services.AddProblemDetails();

var app = builder.Build();

// ── Database initialization ────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (dbProvider.Equals("Postgres", StringComparison.OrdinalIgnoreCase))
    {
        // Apply committed EF migrations in production.
        db.Database.Migrate();
    }
    else
    {
        // SQLite dev: create the schema from the model if it doesn't exist.
        db.Database.EnsureCreated();
    }
}

// ── Middleware pipeline ────────────────────────────────────────────────────
// In production, HTTPS/SSL is terminated at the host/reverse proxy and
// redirection is enforced there; enabling it here too is harmless.
app.UseHttpsRedirection();
app.UseCors();
app.UseRateLimiter();

// Health check for uptime monitors / container orchestrators.
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

// ── POST /api/forms/submit ─────────────────────────────────────────────────
app.MapPost("/api/forms/submit", async (
    FormSubmissionRequest request,
    AppDbContext db,
    IEmailService email,
    HttpContext http,
    ILogger<Program> logger,
    CancellationToken ct) =>
{
    // 1) Honeypot: silently accept (and drop) obvious bot submissions so the bot
    //    can't distinguish success from rejection.
    if (!string.IsNullOrWhiteSpace(request.Company))
    {
        logger.LogInformation("Honeypot tripped for formType {FormType}; dropping.", request.FormType);
        return Results.Ok(new SubmitResponse(true, "Thank you. Your message has been received."));
    }

    // 2) Server-side validation (DataAnnotations + custom rules).
    var validationErrors = Validate(request);
    if (validationErrors.Count > 0)
    {
        return Results.ValidationProblem(validationErrors);
    }

    // 3) Sanitize / normalize and persist.
    var submission = new FormSubmission
    {
        FormType = Trim(request.FormType, 64)!,
        Name = Trim(request.Name, 200)!,
        Email = Trim(request.Email, 320),
        Phone = Trim(request.Phone, 40),
        Message = Trim(request.Message, 5000),
        MetadataJson = request.Metadata is { Count: > 0 }
            ? JsonSerializer.Serialize(request.Metadata)
            : null,
        SourceIp = http.Connection.RemoteIpAddress?.ToString(),
        CreatedAt = DateTimeOffset.UtcNow,
    };

    db.FormSubmissions.Add(submission);
    await db.SaveChangesAsync(ct);

    // 4) Notify staff. Email is best-effort: a delivery failure must not fail
    //    the user's submission (it's already safely stored).
    try
    {
        await email.SendFormNotificationAsync(submission, ct);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to send staff notification email for submission {Id}.", submission.Id);
    }

    return Results.Ok(new SubmitResponse(true, "Thank you. Your message has been received."));
})
.RequireRateLimiting("form-submit")
.WithName("SubmitForm");

app.Run();

// ── Helpers ────────────────────────────────────────────────────────────────
static string? Trim(string? value, int max)
{
    if (string.IsNullOrWhiteSpace(value)) return null;
    var trimmed = value.Trim();
    return trimmed.Length > max ? trimmed[..max] : trimmed;
}

// Server-side validation independent of the client. Returns a field -> errors
// map compatible with Results.ValidationProblem.
static Dictionary<string, string[]> Validate(FormSubmissionRequest r)
{
    var errors = new Dictionary<string, string[]>();

    if (string.IsNullOrWhiteSpace(r.FormType))
        errors["formType"] = new[] { "A form type is required." };

    if (string.IsNullOrWhiteSpace(r.Name))
        errors["name"] = new[] { "Name is required." };

    // Require at least one way to reach the person back.
    if (string.IsNullOrWhiteSpace(r.Email) && string.IsNullOrWhiteSpace(r.Phone))
        errors["email"] = new[] { "Please provide an email address or phone number." };

    if (!string.IsNullOrWhiteSpace(r.Email) &&
        !new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(r.Email))
        errors["email"] = new[] { "Please provide a valid email address." };

    return errors;
}

// Simple response contract returned to the client.
public record SubmitResponse(bool Success, string Message);

// Exposed for potential integration tests.
public partial class Program { }
