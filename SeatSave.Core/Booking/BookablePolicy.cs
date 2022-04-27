using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;

namespace SeatSave.Core.Booking
{
    public class BookablePolicy
    {
        public bool IsSatisfied(DateTime date, Period period, SeatModel seat) { 
            // Bookable if:
            // 1. Check schedule if date is available
            // 2. Check schedule if period on the given date is available
            // 3. Check if there no booking on specified seat on specified date and period
            
            throw new NotImplementedException("TODO"); 
        }
    }
}
