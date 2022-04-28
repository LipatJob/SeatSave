using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;

namespace SeatSave.Core.Booking
{
    public class Booking
    {
        public int Id { get; set; }
        public string BookingCode { get; set; }
        public DateOnly BookingDate { get; set; }
        public Period Period { get; set; }
        public SeatModel Seat { get; set; }
        public string Status { get; set; }
        public StatusHistory StatusHistory { get; set; }

        public void Cancel() { throw new NotImplementedException("TODO"); }
        public void CheckIn() { throw new NotImplementedException("TODO"); }
        public void CheckOut() { throw new NotImplementedException("TODO"); }

    }
}
