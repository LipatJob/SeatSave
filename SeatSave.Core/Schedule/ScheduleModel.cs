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

        public IList<DateOnly> GetAvailableDays() { throw new NotImplementedException("TODO"); }
        public IList<Period> GetAvailablePeriods(DateTime date) { throw new NotImplementedException("TODO"); }

    }
}
