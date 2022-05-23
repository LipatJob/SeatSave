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
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 1);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.True(isAvailable);
        }


        [Fact]
        public void BookingPeriodNotInScheduleIsUnavailable()
        {
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailableDateButNotPeriod()
        {
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.False(isAvailable);
        }


        [Fact]
        public void CannotBookAvailablePeriodButNotDate()
        {
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 5);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, new DateOnly(2024, 1, 1));

            Assert.False(isAvailable);
        }

        [Fact]
        public void AvailablePeriodOnAvailableRegularDayOfWeekIsAvailable()
        {
            var currentDate = new DateOnly(2023, 12, 20);
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 1); // 2024-1-1 is a Monday

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, currentDate);

            Assert.True(isAvailable);
        }

        [Fact]
        public void AvailablePeriodOnAvailableSpecificDateIsAvailable()
        {
            var currentDate = new DateOnly(2024, 1, 1);
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[2];
            var selectedDate = new DateOnly(2024, 1, 2);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, currentDate);

            Assert.True(isAvailable);
        }

        [Fact]
        public void UnavailablePeriodOnAvailableRegularDayOfWeekIsUnavailable()
        {
            var currentDate = new DateOnly(2024, 1, 1);
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[2];
            var selectedDate = new DateOnly(2024, 1, 1);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, currentDate);

            Assert.False(isAvailable);
        }

        [Fact]
        public void UnavailablePeriodOnAvailableSpecificDateIsUnavailable()
        {
            var currentDate = new DateOnly(2024, 1, 1);
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 2);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, currentDate);

            Assert.False(isAvailable);
        }

        [Fact]
        public void UnavailableSpecificDateIsUnavailable()
        {
            var currentDate = new DateOnly(2024, 1, 1);
            var periods = _fixture.Context.Periods.ToList();
            var selectedPeriod = periods[1];
            var selectedDate = new DateOnly(2024, 1, 7);

            var schedule = GetSchedule();
            var isAvailable = schedule.IsAvailable(selectedDate, selectedPeriod, currentDate);

            Assert.False(isAvailable);
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

            Assert.Equal(targetAvailableDays, availableDays);
        }

        [Fact]
        public void GetAvailablePeriodsOnRegularDayGeneratesCorrectly()
        {
            var periods = _fixture.Context.Periods.ToList();
            var targetAvailablePeriods = new[] {
                periods[1],
                periods[3],
                periods[5],
            };

            var currentDate = new DateOnly(2024, 1, 1);
            var selectedDate = new DateOnly(2024, 1, 1);
            var schedule = GetSchedule();
            var availablePeriods = schedule.GetAvailablePeriods(selectedDate, currentDate);

            Assert.Equal(targetAvailablePeriods, availablePeriods);

        }

        [Fact]
        public void GetAvailablePeriodsOnSpecificDayGeneratesCorrectly()
        {
            var periods = _fixture.Context.Periods.ToList();
            var targetAvailablePeriods = new[] {
                periods[2],
                periods[4],
            };

            var currentDate = new DateOnly(2024, 1, 1);
            var selectedDate = new DateOnly(2024, 1, 2);
            var schedule = GetSchedule();
            var availablePeriods = schedule.GetAvailablePeriods(selectedDate, currentDate);

            Assert.Equal(targetAvailablePeriods, availablePeriods);
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

            context.SaveChanges();
        }


        Context = new SeatSaveContext(options);
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}
