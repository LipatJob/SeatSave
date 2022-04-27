using System.ComponentModel.DataAnnotations;

namespace SeatSave.Core.Schedule
{
    public class RegularDayOfWeekAvailability
    {
        [Key]
        public DayOfWeek DayOfWeek { get; set; }

        public IEnumerable<Period> Periods { get; set; }
    }
}
