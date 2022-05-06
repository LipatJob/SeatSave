using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;

namespace SeatSave.Core.Booking
{
    public class BookablePolicy
    {
        // GET: Data by using constructor
        public BookablePolicy(ScheduleModel schedule, IEnumerable<BookingModel> bookings, DateOnly currDate)
        {
            this.schedule = schedule;
            this.bookings = bookings;
            this.currDate = currDate;
        }

        // SET: data from constructor
        ScheduleModel schedule;
        IEnumerable<BookingModel> bookings;
        DateOnly currDate;

        public bool IsSatisfied(DateOnly date, Period period, SeatModel seat)
        {
            // Bookable if:
            // 1. Check schedule if date is available
            // 2. Check schedule if period on the given date is available
            // 3. Check if there no booking on specified seat on specified date and period
            if (schedule.IsAvailable(date, period, currDate))
            {
                if (bookings.Any(e => !(e.Period.id == period.id && e.BookingDate == date && e.Seat.Id == seat.Id)))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
