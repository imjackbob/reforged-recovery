using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Services;

/// <summary>
/// Sends staff notifications over SMTP (e.g. Office 365, Gmail, or a host's
/// relay). Set Email:Provider = "Smtp" and the Email:Smtp* settings to enable.
/// </summary>
public class SmtpEmailService : IEmailService
{
    private readonly EmailOptions _options;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IOptions<EmailOptions> options, ILogger<SmtpEmailService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendFormNotificationAsync(FormSubmission submission, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(_options.SmtpHost))
        {
            _logger.LogWarning("SMTP selected but no host configured; skipping email send.");
            return;
        }

        using var message = new MailMessage
        {
            From = new MailAddress(_options.FromEmail, _options.FromName),
            Subject = EmailContent.BuildSubject(submission),
            Body = EmailContent.BuildPlainTextBody(submission),
            IsBodyHtml = false,
        };
        message.To.Add(_options.StaffInbox);
        if (!string.IsNullOrWhiteSpace(submission.Email))
            message.ReplyToList.Add(new MailAddress(submission.Email, submission.Name));

        using var client = new SmtpClient(_options.SmtpHost, _options.SmtpPort)
        {
            EnableSsl = _options.SmtpUseSsl,
            Credentials = string.IsNullOrWhiteSpace(_options.SmtpUser)
                ? CredentialCache.DefaultNetworkCredentials
                : new NetworkCredential(_options.SmtpUser, _options.SmtpPassword),
        };

        try
        {
            await client.SendMailAsync(message, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SMTP send failed.");
        }
    }
}
