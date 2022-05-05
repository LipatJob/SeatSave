using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SeatSave.Core.Booking;
using SeatSave.Core.Schedule;
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

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<DateOnly>()
             .HaveConversion<DateOnlyConverter, DateOnlyComparer>()
             .HaveColumnType("date");

            configurationBuilder.Properties<TimeOnly>()
                .HaveConversion<TimeOnlyConverter, TimeOnlyComparer>()
                .HaveColumnType("time");
        }
    }
}


/// <summary>
/// Converts <see cref="DateOnly" /> to <see cref="DateTime"/> and vice versa.
/// </summary>
public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public DateOnlyConverter() : base(
            d => d.ToDateTime(TimeOnly.MinValue),
            d => DateOnly.FromDateTime(d))
    { }
}

/// <summary>
/// Compares <see cref="DateOnly" />.
/// </summary>
public class DateOnlyComparer : ValueComparer<DateOnly>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public DateOnlyComparer() : base(
        (d1, d2) => d1 == d2 && d1.DayNumber == d2.DayNumber,
        d => d.GetHashCode())
    {
    }
}

/// <summary>
/// Converts <see cref="DateOnly?" /> to <see cref="DateTime?"/> and vice versa.
/// </summary>
public class NullableDateOnlyConverter : ValueConverter<DateOnly?, DateTime?>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public NullableDateOnlyConverter() : base(
        d => d == null
            ? null
            : new DateTime?(d.Value.ToDateTime(TimeOnly.MinValue)),
        d => d == null
            ? null
            : new DateOnly?(DateOnly.FromDateTime(d.Value)))
    { }
}

/// <summary>
/// Compares <see cref="DateOnly?" />.
/// </summary>
public class NullableDateOnlyComparer : ValueComparer<DateOnly?>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public NullableDateOnlyComparer() : base(
        (d1, d2) => d1 == d2 && d1.GetValueOrDefault().DayNumber == d2.GetValueOrDefault().DayNumber,
        d => d.GetHashCode())
    {
    }
}




/// <summary>
/// Converts <see cref="DateOnly" /> to <see cref="DateTime"/> and vice versa.
/// </summary>
public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public TimeOnlyConverter() : base(
            d => d.ToTimeSpan(),
            d => TimeOnly.FromTimeSpan(d))
    { }
}

/// <summary>
/// Compares <see cref="DateOnly" />.
/// </summary>
public class TimeOnlyComparer : ValueComparer<TimeOnly>
{
    /// <summary>
    /// Creates a new instance of this converter.
    /// </summary>
    public TimeOnlyComparer() : base(
        (d1, d2) => d1 == d2,
        d => d.GetHashCode())
    {
    }
}