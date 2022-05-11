using SeatSave.Core.Booking;

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
            return
                Bookings
                .OrderByDescending(e => e.StatusHistory.DateTimeCreated)
                .Where(e => e.Status == BookingModel.PendingStatus || e.Status == BookingModel.CheckedInStatus)
                .FirstOrDefault();
        }
    }
}
