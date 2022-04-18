using Microsoft.EntityFrameworkCore;
using SeatSave.Core;

namespace SeatSave.EF
{
    public class SeatSaveContext : DbContext
    {
        public SeatSaveContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User { Id = 1, Email = "test@gmail.com", FirstName = "Text", LastName = "Account", Password = "1234", UserType = "Librarian" });
        }
    }
}