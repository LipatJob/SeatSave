using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Booking;
using SeatSave.Core.Schedule;
using SeatSave.EF;
using System;
using System.Collections.Generic;
using Xunit;

namespace SeatSave.Test
{
    public class CreateBooking : IClassFixture<CreateBookingSeedFixture>
    {
        private SeatSaveContext DbContext;

        public CreateBooking(CreateBookingSeedFixture fixture)
        {
            this.DbContext = fixture.Context;
        }

        private BookingService GetBookingService(DateOnly currentDate)
        {
            var schedule = new ScheduleModel(DbContext.RegularDayOfWeekAvailability, DbContext.SpecificDayAvailability);
            return new BookingService(currentDate, schedule, DbContext.Bookings, DbContext.Seats);
        }

        public BookingModel CreateNewPendingBooking()
        {
            var currentDateTime = DateTime.Now;
            var booking = new BookingModel()
            {
                StatusHistory = new StatusHistory
                {
                    DateTimeCreated = new DateTime(2022, 04, 28, 10, 10, 10),
                },
                Status = BookingModel.PendingStatus,
                BookingDate = new DateOnly(2024, 01, 02),
                Period = new Period
                {
                    TimeStart = new TimeOnly(10, 0, 0),
                    TimeEnd = new TimeOnly(11, 30, 0),
                }
            };

            return booking;
        }

        [Fact]
        public void IsDateBookable()
        {
            bool dateBookable = false;
            var currDate = new DateOnly(2022, 04, 28);
            var dateToTest = new DateOnly(2022, 05, 05);
            var booking = GetBookingService(currDate).GetBookableDates();

            foreach (var book in booking)
            {
                if (book == dateToTest)
                {
                    dateBookable = true;
                }
            }

            Assert.True(dateBookable);
        }

        [Fact]
        public void IsTimeBookable()
        {
            bool timeBookable = false;
            var currDate = new DateOnly(2022, 04, 28);
            var dateToTest = new DateOnly(2022, 05, 05);
            var periodToTest = DbContext.Periods.Find(1);

            var bookingPeriods = GetBookingService(currDate).GetBookablePeriods(dateToTest);
            foreach (var periods in bookingPeriods)
            {
                if (periods == periodToTest)
                {
                    timeBookable = true;
                }
            }

            Assert.True(timeBookable);
        }

        [Fact]
        public void IsSeatBookable()
        {
            bool seatBookable = false;
            var currDate = new DateOnly(2022, 04, 28);
            var dateToTest = new DateOnly(2022, 05, 05);
            var periodToTest = DbContext.Periods.Find(1);
            var seatToTest = DbContext.Seats.Find(4);

            var bookingSeats = GetBookingService(currDate).GetBookableSeats(dateToTest, periodToTest);
            foreach (var seats in bookingSeats)
            {
                if (seats == seatToTest)
                {
                    seatBookable = true;
                }
            }

            Assert.True(seatBookable);
        }
    }
}
public class CreateBookingSeedFixture : IDisposable
{
    public SeatSaveContext Context { get; private set; }

    public CreateBookingSeedFixture()
    {
        var options = new DbContextOptionsBuilder<SeatSaveContext>()
          .UseLazyLoadingProxies()
          .UseInMemoryDatabase(databaseName: "SeatSaveDb")
          .Options;

        var periods = new PeriodFactory().GetPeriodsInDay();
        using (var context = new SeatSaveContext(options))
        {
            context.Periods.AddRange(periods);
            context.SpecificDayAvailability.AddRange(new SpecificDateAvailability()
            {
                Date = new DateOnly(2024, 01, 02),
                Periods = new List<Period>{
                    periods[2],
                    periods[4],
                }
            });

            context.RegularDayOfWeekAvailability.AddRange(new RegularDayOfWeekAvailability
            {
                DayOfWeek = DayOfWeek.Monday,
                Periods = new List<Period>{
                    periods[1],
                    periods[3],
                    periods[5],

                }
            });

        }
        Context = new SeatSaveContext(options);
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}