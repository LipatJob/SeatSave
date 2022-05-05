using System.ComponentModel.DataAnnotations;

namespace SeatSave.Core.Schedule
{
    public class RegularDayOfWeekAvailability
    {

        [Key]
        public DayOfWeek DayOfWeek { get; set; }

        public virtual ICollection<Period> Periods { get; set; } = new List<Period>();

    }
}
