using SeatSave.Core.Booking;

namespace SeatSave.Api.Services
{
    public class BookingExpirationService
    {
        private readonly IEnumerable<BookingModel> bookingModel;

        public BookingExpirationService(IEnumerable<BookingModel> bookingModel)
        {
            this.bookingModel = bookingModel;
        }

        public IEnumerable<BookingModel> ExpireBookings()
        {
            var currentDateTime = new DateTime(2022, 04, 29, 12, 30, 0); // FOR TESTING
            TimeOnly currentTime = TimeOnly.FromDateTime(currentDateTime).AddMinutes(-15);
            DateOnly currentDate = DateOnly.FromDateTime(currentDateTime);

            var bookings = bookingModel.Where(e =>
                    (e.Status == BookingModel.CheckedInStatus ||
                    e.Status == BookingModel.PendingStatus) &&
                    e.BookingDate >= currentDate &&
                    e.Period.TimeEnd >= currentTime).ToList();

            foreach (var book in bookings)
            {
                if (book.Status == BookingModel.PendingStatus)
                {
                    book.Cancel(DateTime.Now);
                }
                else
                {
                    book.CheckOut(DateTime.Now);
                }
            }

            return bookings;
        }
    }
}