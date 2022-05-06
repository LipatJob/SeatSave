using SeatSave.Core.Booking;
using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;

namespace SeatSave.Core.User
{
    public class Visitor : UserModel
    {
        public new const string UserGroup = "Visitor";

        public Visitor(string UserType) : base(UserType, UserGroup)
        {
        }

        public virtual IEnumerable<BookingModel> Bookings { get; set; }

        public BookingModel? GetActiveBooking()
        {
            return Bookings
            .OrderByDescending(e => e.StatusHistory.DateTimeCreated)
            .Where(e => e.Status == BookingModel.PendingStatus || e.Status == BookingModel.CheckedInStatus)
            .FirstOrDefault();
        }

        public BookingModel Book(DateTime currTimeStamp, DateOnly date, Period period, SeatModel seat, BookablePolicy policy) // (date, period, seat)
        {
            if (CanBook() == false || policy.IsSatisfied(date, period, seat) == false)
            {
                return null;
            }

            BookingModel bookingInformation = new BookingModel()
            {
                BookingCode = GenerateBookingCode(),
                BookingDate = date,
                Period = period,
                Seat = seat,
                Status = BookingModel.PendingStatus,
                StatusHistory = new StatusHistory()
                {
                    DateTimeCreated = currTimeStamp,
                },
                VisitorId = Id
            };

            Bookings.Append(bookingInformation);
            return bookingInformation;
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

        public bool CanBook()
        {
            // BookablePolicy obj = new BookablePolicy();
            // return obj.IsSatisfied(); // (date, period, seat)
            // User can book if:
            // 1. No pending booking
            // 2. if the date, period and seat is bookable

            if (GetActiveBooking() != null)
            {
                return false;
            }

            return true;
        }

        public BookingModel? GetBookingCodeFromBookings(string bookCodeVar)
        {
            return Bookings.Where(e => e.BookingCode == bookCodeVar).FirstOrDefault();
        }
    }
}
