using System.Text;
using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Services;

/// <summary>Builds the subject/body for the staff notification email.</summary>
public static class EmailContent
{
    public static string BuildSubject(FormSubmission s) =>
        $"[Reforged Website] New {Prettify(s.FormType)} submission from {s.Name}";

    public static string BuildPlainTextBody(FormSubmission s)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"New {Prettify(s.FormType)} submission");
        sb.AppendLine(new string('-', 40));
        sb.AppendLine($"Name:    {s.Name}");
        if (!string.IsNullOrWhiteSpace(s.Email)) sb.AppendLine($"Email:   {s.Email}");
        if (!string.IsNullOrWhiteSpace(s.Phone)) sb.AppendLine($"Phone:   {s.Phone}");
        if (!string.IsNullOrWhiteSpace(s.Message))
        {
            sb.AppendLine();
            sb.AppendLine("Message:");
            sb.AppendLine(s.Message);
        }
        if (!string.IsNullOrWhiteSpace(s.MetadataJson) && s.MetadataJson != "{}")
        {
            sb.AppendLine();
            sb.AppendLine($"Additional details: {s.MetadataJson}");
        }
        sb.AppendLine();
        sb.AppendLine($"Form type: {s.FormType}");
        sb.AppendLine($"Received:  {s.CreatedAt:u}");
        return sb.ToString();
    }

    private static string Prettify(string formType) =>
        formType.Replace('-', ' ');
}
