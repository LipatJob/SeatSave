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

            bool isAvailableOnSpecificDay = specifcDaySchedule.Any(e => e.Date == dateToCheck && e.Periods.Any(e => e.id == period.id));
            if (isAvailableOnSpecificDay) { return true; }

            bool isAvailableOnRegularDay = regularDaySchedule.Any(e => e.DayOfWeek == dateToCheck.DayOfWeek && e.Periods.Any(e => e.id == period.id));
            if (isAvailableOnRegularDay) { return true; }

            return false;
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
            var availableSpecificDays = specifcDaySchedule
                .Where(e => currentDate <= e.Date && e.Date <= endDate && e.Periods.Count > 0)
                .Select(e => e.Date);
            return availableSpecificDays.ToList();
        }

        private IEnumerable<DateOnly> GetAvailabilityOnRegularDays(int numberOfDaysToCheck, DateOnly startDate)
        {
            var datesToCheck = Enumerable.Range(0, numberOfDaysToCheck).Select(d => startDate.AddDays(d));
            var availableDayOfWeeks = regularDaySchedule.Where(e => e.Periods.Count > 0).Select(e => e.DayOfWeek);
            var availableDatesOnRegularAvailability = datesToCheck.Where(e => availableDayOfWeeks.Contains(e.DayOfWeek));
            return availableDatesOnRegularAvailability.ToList();
        }

        public IList<Period> GetAvailablePeriods(DateOnly dateToCheck, DateOnly currentDay)
        {
            var scheduleOnSpecificDay = specifcDaySchedule.FirstOrDefault(e => e.Date == dateToCheck);
            if (scheduleOnSpecificDay != null) { return scheduleOnSpecificDay.Periods.ToList(); }

            var scheduleOnRegularDay = regularDaySchedule.FirstOrDefault(e => e.DayOfWeek == dateToCheck.DayOfWeek);
            if (scheduleOnRegularDay != null) { return scheduleOnRegularDay.Periods.ToList(); }

            return new List<Period>();
        }
    }
}
