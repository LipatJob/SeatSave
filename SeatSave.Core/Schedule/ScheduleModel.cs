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

        public bool IsAvailable(DateTime dateToCheck, Period period, DateTime currentDate)
        {
            if(currentDate.Date > dateToCheck.Date) { return false; }

            bool isAvailableOnRegularDay = regularDaySchedule.Any(e=>e.DayOfWeek == dateToCheck.DayOfWeek && e.Periods.Contains(period));
            bool isAvailableOnSpecificDay = specifcDaySchedule.Any(e => e.Date == dateToCheck.Date && e.Periods.Contains(period));

            return isAvailableOnRegularDay || isAvailableOnSpecificDay;
        }

        public IList<DateTime> GetAvailableDays(DateTime currentDate, int numberOfDaysToCheck)
        {
            var availabilityOnSpecificDays = GetAvailabilityOnSpecificDays(currentDate, numberOfDaysToCheck);
            var availabilityOnRegularDays = GetAvailabilityOnRegularDays(numberOfDaysToCheck, currentDate);
            return availabilityOnSpecificDays.Union(availabilityOnRegularDays).OrderBy(e => e.DayOfWeek).ToList();
        }

        private IEnumerable<DateTime> GetAvailabilityOnSpecificDays(DateTime currentDate, int numberOfDaysToCheck)
        {
            var endDate = currentDate.AddDays(numberOfDaysToCheck).Date;
            var availableSpecificDays = specifcDaySchedule.Where(e => currentDate <= e.Date && e.Date <= endDate).Select(e => e.Date);
            return availableSpecificDays;
        }

        private IEnumerable<DateTime> GetAvailabilityOnRegularDays(int numberOfDaysToCheck, DateTime startDate)
        {
            var datesToCheck = Enumerable.Range(0, numberOfDaysToCheck).Select(d => startDate.AddDays(d));
            var availableDayOfWeeks = regularDaySchedule.Where(e => e.Periods.Count > 0).Select(e => e.DayOfWeek);
            var availableDatesOnRegularAvailability = datesToCheck.Where(e => availableDayOfWeeks.Contains(e.DayOfWeek));
            return availableDatesOnRegularAvailability;
        }

        public IList<Period> GetAvailablePeriods(DateTime dateToCheck, DateTime currentDay) {
            var periodsOnRegularDay = regularDaySchedule.First(e => e.DayOfWeek == dateToCheck.DayOfWeek).Periods;
            var periodsOnSpecificDay = specifcDaySchedule.First(e => e.Date == dateToCheck.Date).Periods;
            return periodsOnRegularDay.Union(periodsOnSpecificDay).OrderBy(e => e.TimeStart).ToList();
        }

    }
}
