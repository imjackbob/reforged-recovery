using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ReforgedRecovery.Api.Data;

/// <summary>
/// Used only by the EF Core tools at design time (e.g. `dotnet ef migrations
/// add`). Migrations are generated against PostgreSQL — the production target —
/// so the committed migration matches prod even when local dev runs on SQLite.
///
/// The connection string here is never opened; it only tells the provider which
/// SQL dialect to emit.
/// </summary>
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=reforged;Username=postgres;Password=postgres")
            .Options;
        return new AppDbContext(options);
    }
}
