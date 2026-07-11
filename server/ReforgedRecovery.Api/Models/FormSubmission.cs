using System.ComponentModel.DataAnnotations;

namespace ReforgedRecovery.Api.Models;

/// <summary>
/// A single form submission from anywhere on the site. All form types (Get Help
/// intake, Anvils notify, Volunteer, Partnership, Contact) land in this one
/// table, distinguished by <see cref="FormType"/>. Form-specific extra fields
/// are stored as JSON in <see cref="Metadata"/>.
/// </summary>
public class FormSubmission
{
    public int Id { get; set; }

    /// <summary>Which form produced this row, e.g. "get-help", "volunteer".</summary>
    [MaxLength(64)]
    public string FormType { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(320)]
    public string? Email { get; set; }

    [MaxLength(40)]
    public string? Phone { get; set; }

    [MaxLength(5000)]
    public string? Message { get; set; }

    /// <summary>Extra form-specific fields serialized as a JSON object string.</summary>
    public string? MetadataJson { get; set; }

    /// <summary>Best-effort source IP, used for spam auditing / rate context.</summary>
    [MaxLength(64)]
    public string? SourceIp { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
