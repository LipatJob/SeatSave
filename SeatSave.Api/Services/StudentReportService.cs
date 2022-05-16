using SeatSave.Core.Booking;
using SeatSave.Core.User;
using SeatSave.EF;

namespace SeatSave.Api.Services
{
    public class ReportData
    {
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<int> Counts { get; set; }
    }

    public class StudentReportService
    {
        private readonly SeatSaveContext dbContext;
        private readonly DateOnly dateStart;
        private readonly DateOnly dateEnd;
        private readonly IEnumerable<BookingModel> bookings;

        public StudentReportService(SeatSaveContext dbContext, DateOnly dateStart, DateOnly dateEnd)
        {
            this.dbContext = dbContext;
            this.dateStart = dateStart;
            this.dateEnd = dateEnd;

            this.bookings = GetBookingsReportPeriod(dateStart, dateEnd);
        }

        public IEnumerable<ReportData> GetTopDepartments()
        {
            var departmentGroups = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.Department);

            var topDepartmentsData = new List<ReportData>() { new ReportData() {
                Categories = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.Department).Select(group => group.Key),
                Counts = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.Department).Select(group => group.Count())
            }};

            return topDepartmentsData;
        }
        public IEnumerable<string> GetTopProgramStrands() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetTopYearLevel() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<string> GetTopProgramStrandAndYearLevel() { throw new NotImplementedException("To be implemented"); }
        public IEnumerable<BookingModel> GetBookingsReportPeriod(DateOnly dateStart, DateOnly dateEnd)
        {
            return dbContext.Bookings.Where(b => b.BookingDate >= dateStart && b.BookingDate <= dateEnd);
        }
    }
}
