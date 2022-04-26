namespace SeatSave.Core.Schedule
{
    public class ScheduleModel
    {
        /* TODO: Properties */

        IEnumerable<RegularDayOfWeekAvailability> regularDaySchedule;
        IEnumerable<SpecificDateAvailability> specifcDaySchedule;

        public ScheduleModel(IEnumerable<RegularDayOfWeekAvailability> regularDaySchedule, IEnumerable<SpecificDateAvailability> specifcDaySchedule)
        {
            this.regularDaySchedule = regularDaySchedule;
            this.specifcDaySchedule = specifcDaySchedule;
        }

        public bool IsAvailable(DateTime date, Period period) { throw new NotImplementedException("TODO"); }
        public IList<DateOnly> GetAvailableDays() { throw new NotImplementedException("TODO"); }
        public IList<Period> GetAvailablePeriods(DateTime date) { throw new NotImplementedException("TODO"); }

    }
}
