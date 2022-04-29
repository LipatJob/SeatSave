using System.ComponentModel.DataAnnotations;


namespace SeatSave.Core.Schedule
{
    public class Period
    {
        [Key]
        public int id { get; set; }
        public TimeSpan TimeStart { get; set; }
        public TimeSpan TimeEnd { get; set; }

        public Period()
        {

        }

        public Period(int id, TimeSpan TimeStart, TimeSpan TimeEnd)
        {
            this.id = id;
            this.TimeStart = TimeStart;
            this.TimeEnd = TimeEnd;
        }
    }
}
