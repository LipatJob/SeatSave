using System.ComponentModel.DataAnnotations;

namespace SeatSave.Core.Schedule
{
    public class SpecificDateAvailability
    {
        [Key]
        public DateTime Date { get; set; }

        public List<Period> Periods { get; set; }
    }
}
