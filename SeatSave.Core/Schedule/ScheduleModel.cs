namespace SeatSave.Core.Schedule
{
    public class ScheduleModel
    {
        IEnumerable<RegularDayOfWeekAvailability> regularDaySchedule;
        IEnumerable<SpecificDateAvailability> specifcDaySchedule;

        public ScheduleModel(IEnumerable<RegularDayOfWeekAvailability> regularDaySchedule, IEnumerable<SpecificDateAvailability> specifcDaySchedule)
        {
            this.regularDaySchedule = regularDaySchedule;
            this.specifcDaySchedule = specifcDaySchedule;
        }

        public bool IsAvailable(DateOnly dateToCheck, Period period, DateOnly currentDate)
        {
            if (currentDate > dateToCheck) { return false; }

            bool isAvailableOnRegularDay = regularDaySchedule.Any(e => e.DayOfWeek == dateToCheck.DayOfWeek && e.Periods.Contains(period));
            bool isAvailableOnSpecificDay = specifcDaySchedule.Any(e => e.Date == dateToCheck && e.Periods.Contains(period));

            return isAvailableOnRegularDay || isAvailableOnSpecificDay;
        }

        public IList<DateOnly> GetAvailableDays(DateOnly currentDate, int numberOfDaysToCheck)
        {
            var availabilityOnSpecificDays = GetAvailabilityOnSpecificDays(currentDate, numberOfDaysToCheck);
            var availabilityOnRegularDays = GetAvailabilityOnRegularDays(numberOfDaysToCheck, currentDate);
            return availabilityOnSpecificDays.Union(availabilityOnRegularDays).OrderBy(e => e.DayOfWeek).ToList();
        }

        private IEnumerable<DateOnly> GetAvailabilityOnSpecificDays(DateOnly currentDate, int numberOfDaysToCheck)
        {
            var endDate = currentDate.AddDays(numberOfDaysToCheck);
            var availableSpecificDays = specifcDaySchedule.Where(e => currentDate <= e.Date && e.Date <= endDate).Select(e => e.Date);
            return availableSpecificDays;
        }

        private IEnumerable<DateOnly> GetAvailabilityOnRegularDays(int numberOfDaysToCheck, DateOnly startDate)
        {
            var datesToCheck = Enumerable.Range(0, numberOfDaysToCheck).Select(d => startDate.AddDays(d));
            var availableDayOfWeeks = regularDaySchedule.Where(e => e.Periods.Count > 0).Select(e => e.DayOfWeek);
            var availableDatesOnRegularAvailability = datesToCheck.Where(e => availableDayOfWeeks.Contains(e.DayOfWeek));
            return availableDatesOnRegularAvailability;
        }

        public IList<Period> GetAvailablePeriods(DateOnly dateToCheck, DateOnly currentDay)
        {
            var periodsOnRegularDay = regularDaySchedule.First(e => e.DayOfWeek == dateToCheck.DayOfWeek).Periods;
            var periodsOnSpecificDay = specifcDaySchedule.First(e => e.Date == dateToCheck).Periods;
            return periodsOnRegularDay.Union(periodsOnSpecificDay).OrderBy(e => e.TimeStart).ToList();
        }

    }
}
