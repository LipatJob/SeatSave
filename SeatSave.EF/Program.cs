using Microsoft.EntityFrameworkCore;
using SeatSave.EF;

if (args.Length == 1 && args[0].ToLower() == "seed")
{
    DbContextOptionsBuilder options = new DbContextOptionsBuilder();
    options.UseLazyLoadingProxies();
    var folder = Environment.SpecialFolder.Personal;
    var path = Environment.GetFolderPath(folder);
    var DbPath = System.IO.Path.Join(path, "SeatSave.db");
    options.UseSqlite(
        $"Data Source={DbPath}",
        e => e.MigrationsAssembly("SeatSave.Api"));
    using (var dbContext = new SeatSaveContext(options.Options))
    {
        dbContext.Database.EnsureDeleted();
        dbContext.Database.EnsureCreated();

        var seeder = new SeatSaveDbSeeder(dbContext);
        seeder.Seed();
    }
}