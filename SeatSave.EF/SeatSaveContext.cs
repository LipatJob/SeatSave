using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Schedule;

using SeatSave.Core.Booking;
using SeatSave.Core.Seat;
using SeatSave.Core.User;

namespace SeatSave.EF
{
    public class SeatSaveContext : DbContext
    {
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
            modelBuilder.Entity<Period>().HasData(period);

            modelBuilder.Entity<RegularDayOfWeekAvailability>().HasData(
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Monday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Tuesday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Wednesday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Thursday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Friday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Saturday,
                    Periods = new List<Period>()
                },
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Sunday,
                    Periods = new List<Period>()
                }
            );
            modelBuilder.Entity<SpecificDateAvailability>().HasData(
                new SpecificDateAvailability()
                {
                    Date = new DateOnly(2024, 04, 04),
                    Periods = new List<Period>()
                }
            );

            modelBuilder.Entity<Librarian>().HasData(
                new Librarian
                {
                    Id = 1,
                    Email = "librarian@gmail.com",
                    FirstName = "Text",
                    LastName = "Account",
                    Password = "1234567"
                }
            );
            modelBuilder.Entity<Student>().HasData(
               new Student
               {
                   Id = 2,
                   Email = "student@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "1234567",
                   ProgramStrand = "CS",
                   YearGrade = "First Year",
               },
               new Student
               {
                   Id = 3,
                   Email = "another_student@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "password",
                   ProgramStrand = "IT",
                   YearGrade = "First Year",
               });
            modelBuilder.Entity<SeatModel>().HasData(
                new SeatModel
                {
                    Id = 1,
                    Name = "ABC",
                    Type = "1",
                    Active = true,
                    Description = "description description",
                },
                new SeatModel
                {
                    Id = 2,
                    Name = "DEF",
                    Type = "2",
                    Active = false,
                    Description = "description2 description2",
                }
            );
            modelBuilder.Entity<StatusHistory>().HasData(
                new StatusHistory
                {
                    Id = 1,
                    DateTimeCreated = new DateTime(2022, 4, 27, 17, 11, 29),
                    DateTimeCheckedIn = new DateTime(2022, 4, 28, 8, 2, 0),
                    DateTimeCheckedOut = new DateTime(2022, 4, 28, 9, 26, 0),
                },
                new StatusHistory
                {
                    Id = 2,
                    DateTimeCreated = new DateTime(2022, 04, 28, 10, 10, 10)
                }
            );
            modelBuilder.Entity<BookingModel>().HasData(
                new BookingModel
                {
                    Id = 1,
                    BookingCode = "1234",
                    BookingDate = new DateOnly(2022, 04, 28),
                    PeriodId = 3,
                    SeatId = 1,
                    Status = "Completed",
                    StatusHistoryId = 1,
                    UserModelId = 2
                },
                new BookingModel
                {
                    Id = 2,
                    BookingCode = "5678",
                    BookingDate = new DateOnly(2022, 04, 29),
                    PeriodId = 5,
                    SeatId = 2,
                    Status = "Pending",
                    StatusHistoryId = 2,
                    UserModelId = 2
                }
            );

        }
    }
}