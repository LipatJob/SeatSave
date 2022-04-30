using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Schedule;
using SeatSave.EF;
using System;
using System.Collections.Generic;
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
            var selectedDate = new DateOnly(2024, 1, 2);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.True(isAvailable);
        }


        [Fact]
        public void BookingPeriodNotInScheduleIsUnavailable()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailableDateButNotPeriod()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailablePeriodButNotDate()
        {
            var periods = new PeriodFactory().GetPeriodsInDay();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

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
                new DateOnly(2024, 1, 1),
                new DateOnly(2024, 1, 2)
            };

            var schedule = GetSchedule();
            var availableDays = schedule.GetAvailableDays(new DateOnly(2024, 1, 1), 5);

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
            context.SpecificDayAvailability.AddRange();

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

    public void Dispose()
    {
        Context.Dispose();
    }
}
