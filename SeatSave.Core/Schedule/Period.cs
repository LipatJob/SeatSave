namespace SeatSave.Core.Schedule
{
    public class Period
    {
        public Period()
        {
        }

        public Period(int id, TimeSpan timeStart, TimeSpan timeEnd)
        {
            this.id = id;
            TimeStart = timeStart;
            TimeEnd = timeEnd;
        }

        public int id { get; set; }
        public TimeSpan TimeStart { get; set; }
        public TimeSpan TimeEnd { get; set; }


        public virtual ICollection<RegularDayOfWeekAvailability>? RegularDayOfWeekAvailabilities { get; set; }
        public virtual ICollection<SpecificDateAvailability>? SpecificDateAvailabilities { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is Period period &&
                   id == period.id &&
                   TimeStart.Equals(period.TimeStart) &&
                   TimeEnd.Equals(period.TimeEnd);
        }

        public override int GetHashCode()
        {
            throw new NotImplementedException();
        }
    }
}
