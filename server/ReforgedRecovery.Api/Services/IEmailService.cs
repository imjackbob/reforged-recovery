using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Services;

public interface IEmailService
{
    /// <summary>
    /// Notify staff that a form was submitted. Implementations must not throw on
    /// transient failures in a way that fails the user's request — the caller
    /// treats email as best-effort and logs failures.
    /// </summary>
    Task SendFormNotificationAsync(FormSubmission submission, CancellationToken ct = default);
}
