using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Schedule;

using SeatSave.Core.Booking;
using SeatSave.Core.Seat;
using SeatSave.Core.User;

namespace SeatSave.EF
{
    public class SeatSaveContext : DbContext
    {
        public SeatSaveContext(object value)
        {
        }

        public SeatSaveContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<Faculty> FacultyMembers { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<HeadLibrarian> HeadLibrarians { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
        public DbSet<BookingModel> Bookings { get; set; }
        public DbSet<StatusHistory> StatusHistory { get; set; }

        public DbSet<SeatModel> Seat { get; set; }

        public DbSet<RegularDayOfWeekAvailability> RegularDayOfWeekAvailability { get; set; }
        public DbSet<SpecificDateAvailability> SpecificDayAvailability { get; set; }
        public DbSet<Period> Periods { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var period = new PeriodFactory().GetPeriodsInDay();
            modelBuilder.Entity<Period>().HasIndex(p => new { p.TimeStart, p.TimeEnd }).IsUnique();
            modelBuilder.Entity<RegularDayOfWeekAvailability>()
                .HasMany(g => g.Periods)
                .WithMany("RegularDayOfWeekAvailabilities");
            modelBuilder.Entity<SpecificDateAvailability>()
                .HasMany(g => g.Periods)
                .WithMany("SpecificDateAvailabilities");
        }
    }
}