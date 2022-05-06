
using SeatSave.Core.Booking;
using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;
using SeatSave.Core.User;

namespace SeatSave.EF
{
    public class SeatSaveDbSeeder
    {
        SeatSaveContext context;

        public SeatSaveDbSeeder(SeatSaveContext context)
        {
            this.context = context;
        }

        public void Seed()
        {

            var periods = new PeriodFactory().GetPeriodsInDay();
            context.Periods.AddRange(periods);
            context.Periods.Add(new Period(100, new TimeOnly(0, 0, 0), new TimeOnly(0, 0, 0)));

            context.SpecificDayAvailability.AddRange(new SpecificDateAvailability
            {
                Date = new DateOnly(2022, 05, 04),
                Periods = {
                    periods[0],
                    periods[1]
                }
            });

            context.RegularDayOfWeekAvailability.AddRange(
                new RegularDayOfWeekAvailability()
                {
                    DayOfWeek = DayOfWeek.Monday,
                    Periods = {
                        periods[0]
                    }
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

            context.Librarians.AddRange(
                new Librarian
                {
                    Email = "librarian@gmail.com",
                    FirstName = "Text",
                    LastName = "Account",
                    Password = "1234567"
                }
            );

            context.Students.AddRange(
               new Student
               {
                   Email = "student@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "1234567",
                   ProgramStrand = "STEM",
                   Department = "SHS",
                   YearGrade = "Grade 11",
               },
               new Student
               {
                   Email = "student2@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "password",
                   ProgramStrand = "B.S. BUSINESS ADMINISTRATION",
                   Department = "ETCYB",
                   YearGrade = "First Year",
               },
                new Student
                {
                    Email = "student3@gmail.com",
                    FirstName = "Text",
                    LastName = "Account",
                    Password = "1234567",
                    ProgramStrand = "B.S. COMPUTER SCIENCE",
                    Department = "CCIS",
                    YearGrade = "First Year",
                }
            );

            context.Staffs.AddRange(
                new Staff
                {
                    Email = "staff@mcl.edu.ph",
                    FirstName = "Staff",
                    LastName = "Account",
                    Password = "1234567",
                    StaffOffice = "Blue and Silver Bookshop"
                }
            );

            context.FacultyMembers.AddRange(
              new Faculty
              {
                  Email = "faculty@mcl.edu.ph",
                  FirstName = "Staff",
                  LastName = "Account",
                  Password = "1234567",
                  FacultyOffice = "College of Computer and Information Science (CCIS)"
              }
          );

            context.AddRange(
                new SeatModel
                {
                    Name = "ABC",
                    Type = "1",
                    Active = true,
                    Description = "description description",
                },
                new SeatModel
                {
                    Name = "DEF",
                    Type = "2",
                    Active = false,
                    Description = "description2 description2",
                }
            );

            context.Bookings.AddRange(

                new BookingModel
                {
                    BookingCode = "5678",
                    BookingDate = new DateOnly(2022, 04, 29),
                    PeriodId = 5,
                    SeatId = 2,
                    Status = BookingModel.PendingStatus,
                    StatusHistory = new StatusHistory
                    {
                        DateTimeCreated = new DateTime(2022, 04, 28, 10, 10, 10)
                    },
                    VisitorId = 2
                },
                new BookingModel
                {
                    BookingCode = "1234",
                    BookingDate = new DateOnly(2022, 04, 28),
                    PeriodId = 3,
                    SeatId = 1,
                    Status = BookingModel.CheckedOutStatus,
                    StatusHistory = new StatusHistory
                    {
                        DateTimeCreated = new DateTime(2022, 4, 27, 17, 11, 29),
                        DateTimeCheckedIn = new DateTime(2022, 4, 28, 10, 2, 0),
                        DateTimeCheckedOut = new DateTime(2022, 4, 28, 11, 26, 0),
                    },
                    VisitorId = 3
                },
                 new BookingModel
                 {
                     BookingCode = "34531",
                     BookingDate = new DateOnly(2022, 04, 29),
                     PeriodId = 5,
                     SeatId = 2,
                     Status = BookingModel.CheckedInStatus,
                     StatusHistory = new StatusHistory
                     {
                         DateTimeCreated = new DateTime(2022, 04, 28, 10, 10, 10),
                         DateTimeCheckedIn = new DateTime(2022, 04, 28, 11, 10, 10),
                     },
                     VisitorId = 4
                 }
            );

            context.SaveChanges();
        }
    }
}