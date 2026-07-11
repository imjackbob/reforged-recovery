using Microsoft.EntityFrameworkCore;
using ReforgedRecovery.Api.Models;

namespace ReforgedRecovery.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<FormSubmission> FormSubmissions => Set<FormSubmission>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FormSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            // Query submissions by type and recency in any future admin view.
            entity.HasIndex(e => e.FormType);
            entity.HasIndex(e => e.CreatedAt);
        });
    }
}
