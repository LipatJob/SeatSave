using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeatSave.Core.Schedule
{
    public class SpecificDateAvailability
    {
        [Key]
        [Column(TypeName = "Date")]
        public DateTime Date { get; set; }

        public virtual ICollection<Period> Periods { get; set; } = new List<Period>();
    }
}
