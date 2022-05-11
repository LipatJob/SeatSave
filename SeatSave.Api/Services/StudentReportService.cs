using SeatSave.Core.Booking;

namespace SeatSave.Api.Services
{
    public class StudentReportService
    {
        private readonly DateOnly dateStart;
        private readonly DateOnly dateEnd;
        private readonly IEnumerable<BookingModel> bookings;

        public StudentReportService(DateOnly dateStart, DateOnly dateEnd, IEnumerable<BookingModel> bookings)
        {
            this.dateStart = dateStart;
            this.dateEnd = dateEnd;
            this.bookings = bookings;
        }

        public IEnumerable<string> GetTopDepartments() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetTopProgramStrands() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetTopYearLevel() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetTopProgramStrandAndYearLevel() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetBookingsReportPeriod() { throw new NotImplementedException("To be implemented"); }
    }
}
