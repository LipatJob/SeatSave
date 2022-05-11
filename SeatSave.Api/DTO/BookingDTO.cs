using SeatSave.Core.Booking;
using System.ComponentModel.DataAnnotations;

namespace SeatSave.Api.DTO
{
    public class BookingDTO
    {
        [Required]
        public string? isoDate { get; set; }
        public int periodId { get; set; }
        public int seatId { get; set; }


        public BookingModel ToModel()
        {
            return new BookingModel()
            {

            };
        }
    }
}