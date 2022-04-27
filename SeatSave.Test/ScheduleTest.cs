using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Schedule;
using SeatSave.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace SeatSave.Test
{
    public class ScheduleTest : IClassFixture<ScheduleSeedFixture>
    {
        ScheduleSeedFixture _fixture;

        public ScheduleTest(ScheduleSeedFixture fixture)
        {
            _fixture = fixture;
        }

        private ScheduleModel GetSchedule()
        {
            return new ScheduleModel(
                _fixture.Context.RegularDayOfWeekAvailability,
                _fixture.Context.SpecificDayAvailability);
        }


        [Fact]
        public void BookingPeriodInScheduleIsAvailable()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateTime(2024, 1, 2);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateTime(2024, 1, 1));

            Assert.True(isAvailable);
        }


        [Fact]
        public void BookingPeriodNotInScheduleIsUnavailable()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateTime(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateTime(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailableDateButNotPeriod()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateTime(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateTime(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailablePeriodButNotDate()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateTime(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateTime(2024, 1, 1));

            Assert.False(isAvailable);
        }

        [Fact]
        public void PeriodOnRegularDayOfWeekIsAvailable()
        {
        }

        [Fact]
        public void PeriodOnSpecificDateIsAvailable()
        {
        }

        [Fact]
        public void UnavailablePeriodOnRegularDayOfWeekIsUnavailable()
        {
        }

        [Fact]
        public void UnavailablePeriodOnSpecificDateIsUnavailable()
        {
        }

        [Fact]
        public void UnavailableSpecificDateIsUnavailable()
        {
        }

        [Fact]
        public void GetAvailableDaysGeneratesCorrectly()
        {
            var targetAvailableDays = new[] {
                new DateTime(2024, 1, 1),
                new DateTime(2024, 1, 2)
            };

            var schedule = GetSchedule();
            var availableDays = schedule.GetAvailableDays(new DateTime(2024, 1, 1), 5);
         
            Assert.Equal(availableDays, targetAvailableDays);
        }

        [Fact]
        public void GetAvailablePeriodsOnRegularDayGeneratesCorrectly()
        {
        }

        [Fact]
        public void GetAvailablePeriodsOnSpecificDayGeneratesCorrectly()
        {
        }
    }
}


public class ScheduleSeedFixture : IDisposable
{
    public SeatSaveContext Context { get; private set; }

    public ScheduleSeedFixture()
    {
        var options = new DbContextOptionsBuilder<SeatSaveContext>()
          .UseLazyLoadingProxies()
          .UseInMemoryDatabase(databaseName: "SeatSaveDb")
          .Options;

        var periods = new PeriodFactory().GetPeriodsInDay();
        using (var context = new SeatSaveContext(options))
        {
            context.Periods.AddRange(periods);
            context.SpecificDayAvailability.AddRange(new SpecificDateAvailability
            {
                Date = new DateTime(2024, 1, 2),
                Periods = new List<Period>{
                    periods[1]
                }
            });

            context.RegularDayOfWeekAvailability.AddRange(new RegularDayOfWeekAvailability
            {
                DayOfWeek = DayOfWeek.Monday,
                Periods = new List<Period>{
                    periods[1]
                }
            });

            context.SaveChanges();
        }


        Context = new SeatSaveContext(options);
    }


    private SpecificDateAvailability CreateSpecificDateAvailability(DateTime date, IList<Period> Periods)
    {
        var dateAvailability = new SpecificDateAvailability();
        dateAvailability.Date = date;
        foreach (var period in Periods)
        {
            dateAvailability.Periods.Add(period);
        }
        return dateAvailability;
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}
