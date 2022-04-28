using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;

namespace SeatSave.Core.Booking
{
    public class Booking
    {
        public int Id { get; set; }
        public string BookingCode { get; set; }
        public DateOnly BookingDate { get; set; }
        public virtual Period Period { get; set; }
        public virtual SeatModel Seat { get; set; }
        public string Status { get; set; }
        public virtual StatusHistory StatusHistory { get; set; }

        public void Cancel() { throw new NotImplementedException("TODO"); }
        public void CheckIn() { throw new NotImplementedException("TODO"); }
        public void CheckOut() { throw new NotImplementedException("TODO"); }

    }
}
