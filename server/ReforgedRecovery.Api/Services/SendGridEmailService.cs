using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Services;

/// <summary>
/// Sends staff notifications via the SendGrid v3 REST API using a plain
/// HttpClient (no extra NuGet dependency). Set Email:Provider = "SendGrid" and
/// Email:SendGridApiKey to enable. See README > Integrations.
/// </summary>
public class SendGridEmailService : IEmailService
{
    private readonly HttpClient _http;
    private readonly EmailOptions _options;
    private readonly ILogger<SendGridEmailService> _logger;

    public SendGridEmailService(
        HttpClient http,
        IOptions<EmailOptions> options,
        ILogger<SendGridEmailService> logger)
    {
        _http = http;
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendFormNotificationAsync(FormSubmission submission, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_options.SendGridApiKey))
        {
            _logger.LogWarning("SendGrid selected but no API key configured; skipping email send.");
            return;
        }

        var payload = new
        {
            personalizations = new[]
            {
                new { to = new[] { new { email = _options.StaffInbox } } }
            },
            from = new { email = _options.FromEmail, name = _options.FromName },
            // Let staff reply straight to the submitter when an email was given.
            reply_to = string.IsNullOrWhiteSpace(submission.Email)
                ? null
                : new { email = submission.Email, name = submission.Name },
            subject = EmailContent.BuildSubject(submission),
            content = new[]
            {
                new { type = "text/plain", value = EmailContent.BuildPlainTextBody(submission) }
            }
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.sendgrid.com/v3/mail/send");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _options.SendGridApiKey);
        request.Content = new StringContent(
            JsonSerializer.Serialize(payload, new JsonSerializerOptions { DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull }),
            Encoding.UTF8,
            "application/json");

        var response = await _http.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(ct);
            _logger.LogError("SendGrid send failed ({Status}): {Body}", (int)response.StatusCode, body);
        }
    }
}
