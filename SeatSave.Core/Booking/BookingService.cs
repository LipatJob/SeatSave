using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;
using SeatSave.Core.User;

namespace SeatSave.Core.Booking
{
    public class BookingService
    {
        private readonly DateOnly currDate;
        private readonly ScheduleModel schedule;
        private readonly IEnumerable<BookingModel> bookings;
        private readonly IEnumerable<SeatModel> seats;

        public BookingService(DateOnly currentDate, ScheduleModel schedule, IEnumerable<BookingModel> bookings, IEnumerable<SeatModel> seats)
        {
            this.currDate = currentDate;
            this.schedule = schedule;
            this.bookings = bookings;
            this.seats = seats;
        }

        public IEnumerable<DateOnly> GetBookableDates()
        {
            return schedule.GetAvailableDays(currDate, 21);
        }

        public IEnumerable<Period> GetBookablePeriods(DateOnly date)
        {
            return schedule.GetAvailablePeriods(date, currDate);
        }

        public IEnumerable<SeatModel> GetBookableSeats(DateOnly date, Period period)
        {
            var unavailableSeatsForBooking = bookings.Where(e => e.BookingDate == date && e.PeriodId == period.id).Select(e => e.Seat);
            var bookableSeats = seats.Where(e => !unavailableSeatsForBooking.Contains(e) && e.Active == true);
            return bookableSeats;
        }

        public bool IsBookable(DateOnly date, Period period, SeatModel seat)
        {
            return
                schedule.IsAvailable(date, period, currDate) &&
                bookings.Any(e => !(e.Period.id == period.id && e.BookingDate == date && e.Seat.Id == seat.Id));
        }

        public bool IsValidBooking(DateOnly bookingDate, Period period, SeatModel seat, Visitor visitor)
        {
            return
                seat.Active &&                          // seat must be active
                visitor.GetActiveBooking() == null &&   // user must not have an active booking
                IsBookable(bookingDate, period, seat);  // selected date, period, and seat must be bookable
        }

        public BookingModel book(DateOnly bookingDate, Period period, SeatModel seat, Visitor visitor)
        {

            return new BookingModel()
            {
                BookingDate = bookingDate,
                Period = period,
                Seat = seat,
                VisitorModel = visitor,
                BookingCode = GenerateBookingCode(),
                Status = BookingModel.PendingStatus,
                StatusHistory = new StatusHistory()
                {
                    DateTimeCreated = DateTime.Now,
                },
            };
        }

        public string GenerateBookingCode()
        {
            string finalBookCode;
            while (true)
            {
                Random rand = new Random();
                int[] bookCode = { 0, 0, 0, 0, 0 };

                bookCode[0] = rand.Next(0, 10);
                bookCode[1] = rand.Next(0, 10);
                bookCode[2] = rand.Next(0, 10);
                bookCode[3] = rand.Next(0, 10);
                bookCode[4] = rand.Next(0, 10);

                finalBookCode = string.Join("", bookCode);
                if (GetBookingCodeFromBookings(finalBookCode) == null)
                {
                    break;
                }
            }

            return finalBookCode;
        }

        private BookingModel? GetBookingCodeFromBookings(string bookCodeVar)
        {
            return bookings.Where(e => e.BookingCode == bookCodeVar).FirstOrDefault();
        }
    }
}
