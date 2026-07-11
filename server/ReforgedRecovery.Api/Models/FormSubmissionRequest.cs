using System.ComponentModel.DataAnnotations;

namespace ReforgedRecovery.Api.Models;

/// <summary>
/// The JSON payload accepted by POST /api/forms/submit. Validated server-side
/// via DataAnnotations plus custom rules in the endpoint (never trust the
/// client). Mirrors the shape produced by the React <c>useForm</c> hook.
/// </summary>
public class FormSubmissionRequest
{
    [Required(ErrorMessage = "A form type is required.")]
    [MaxLength(64)]
    public string FormType { get; set; } = string.Empty;

    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Please provide a valid email address.")]
    [MaxLength(320)]
    public string? Email { get; set; }

    [MaxLength(40)]
    public string? Phone { get; set; }

    [MaxLength(5000)]
    public string? Message { get; set; }

    /// <summary>Arbitrary form-specific fields (e.g. supportType, areaOfInterest).</summary>
    public Dictionary<string, string>? Metadata { get; set; }

    /// <summary>
    /// Honeypot. Must be empty for a real submission. Bots that auto-fill every
    /// field set this; the endpoint silently drops those.
    /// </summary>
    public string? Company { get; set; }
}
