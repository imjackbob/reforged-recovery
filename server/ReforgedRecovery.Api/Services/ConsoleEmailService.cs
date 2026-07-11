using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Services;

/// <summary>
/// Dev default: "sends" by logging the email to the console. Lets the whole
/// stack run locally with zero external dependencies or API keys.
/// </summary>
public class ConsoleEmailService : IEmailService
{
    private readonly ILogger<ConsoleEmailService> _logger;

    public ConsoleEmailService(ILogger<ConsoleEmailService> logger) => _logger = logger;

    public Task SendFormNotificationAsync(FormSubmission submission, CancellationToken ct = default)
    {
        _logger.LogInformation(
            "[ConsoleEmail] Would send staff notification:\nSubject: {Subject}\n{Body}",
            EmailContent.BuildSubject(submission),
            EmailContent.BuildPlainTextBody(submission));
        return Task.CompletedTask;
    }
}
