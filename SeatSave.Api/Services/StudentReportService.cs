using SeatSave.Core.Booking;
using SeatSave.Core.User;
using SeatSave.EF;
using System.Linq;

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
        private readonly DateOnly? dateStart;
        private readonly DateOnly? dateEnd;
        private readonly IEnumerable<BookingModel> bookings;

        public StudentReportService(SeatSaveContext dbContext, DateOnly? dateStart, DateOnly? dateEnd)
        {
            this.dbContext = dbContext;
            this.dateStart = dateStart;
            this.dateEnd = dateEnd;

            this.bookings = GetBookingsReportPeriod(dateStart, dateEnd);
        }

        public IEnumerable<ReportData> GetTopDepartments()
        {
            var departmentGroups = bookings.Where(b => b.Status == BookingModel.CheckedOutStatus).Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.Department);

            var topDepartmentsData = new List<ReportData>() { new ReportData() {
                Categories = departmentGroups.Select(group => group.Key),
                Counts = departmentGroups.Select(group => group.Count())
            }};

            return topDepartmentsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrands()
        {
            var programStrandsGroups = bookings.Where(b => b.Status == BookingModel.CheckedOutStatus).Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.ProgramStrand);

            var topProgramStrandsData = new List<ReportData>() { new ReportData() {
                Categories = programStrandsGroups.Select(group => group.Key),
                Counts = programStrandsGroups.Select(group => group.Count())
            }};

            return topProgramStrandsData;
        }
        public IEnumerable<ReportData> GetTopYearLevel()
        {
            var yearLevelGroups = bookings.Where(b => b.Status == BookingModel.CheckedOutStatus).Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.YearGrade);

            var topYearLevelsData = new List<ReportData>() { new ReportData() {
                Categories = yearLevelGroups.Select(group => group.Key),
                Counts = yearLevelGroups.Select(group => group.Count())
            }};

            return topYearLevelsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrandAndYearLevel()
        {
            var programYearGroups = bookings.Where(b => b.Status == BookingModel.CheckedOutStatus).Select(b => b.VisitorModel).OfType<Student>()
                .GroupBy(e => new { e.ProgramStrand, e.YearGrade }, (key, group) => new {
                    Category = key.ProgramStrand + " - " + key.YearGrade,
                    Count = group.Count()
            });

            var topProgramYearsData = new List<ReportData>() { new ReportData() {
                Categories = programYearGroups.Select(e => e.Category),
                Counts = programYearGroups.Select(e => e.Count)
            }};

            return topProgramYearsData;
        }
        public IEnumerable<BookingModel> GetBookingsReportPeriod(DateOnly? dateStart, DateOnly? dateEnd)
        {
            DateOnly minDate = dbContext.Bookings.Min(b => b.BookingDate);
            DateOnly maxDate = dbContext.Bookings.Max(b => b.BookingDate);

            if (dateStart == null)
                dateStart = minDate;
            if (dateEnd == null)
                dateEnd = maxDate;

            return dbContext.Bookings.Where(b => b.BookingDate >= dateStart && b.BookingDate <= dateEnd);
        }
    }
}
