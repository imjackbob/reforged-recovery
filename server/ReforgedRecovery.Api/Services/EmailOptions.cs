namespace ReforgedRecovery.Api.Services;

/// <summary>
/// Email configuration, bound from the "Email" section of appsettings /
/// environment variables. See appsettings.json and the README.
/// </summary>
public class EmailOptions
{
    public const string SectionName = "Email";

    /// <summary>"Console" (dev, logs only), "SendGrid", or "Smtp".</summary>
    public string Provider { get; set; } = "Console";

    /// <summary>Address staff notifications are sent to.</summary>
    public string StaffInbox { get; set; } = "info@reforgedrecovery.org";

    /// <summary>Verified "from" address for the transactional sender.</summary>
    public string FromEmail { get; set; } = "no-reply@reforgedrecovery.org";
    public string FromName { get; set; } = "Reforged Recovery Website";

    /// <summary>Also send the submitter a confirmation email when possible.</summary>
    public bool SendConfirmationToSubmitter { get; set; } = false;

    // --- SendGrid ---
    public string? SendGridApiKey { get; set; }

    // --- SMTP ---
    public string? SmtpHost { get; set; }
    public int SmtpPort { get; set; } = 587;
    public string? SmtpUser { get; set; }
    public string? SmtpPassword { get; set; }
    public bool SmtpUseSsl { get; set; } = true;
}
