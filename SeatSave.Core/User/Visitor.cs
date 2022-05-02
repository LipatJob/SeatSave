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
                BookingCode = "12345",
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

            // BEFORE CREATING OBJECT:
            // Check if User can book (CanBook())
            // 1. Create Booking Object out of the parameters
            // 2. Add booking object to visitor book history (List)
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
    }
}
