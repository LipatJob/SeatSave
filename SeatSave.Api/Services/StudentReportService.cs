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
            var departmentGroups = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.Department);

            var topDepartmentsData = new List<ReportData>() { new ReportData() {
                Categories = departmentGroups.Select(group => group.Key),
                Counts = departmentGroups.Select(group => group.Count())
            }};

            return topDepartmentsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrands()
        {
            var programStrandsGroups = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.ProgramStrand);

            var topProgramStrandsData = new List<ReportData>() { new ReportData() {
                Categories = programStrandsGroups.Select(group => group.Key),
                Counts = programStrandsGroups.Select(group => group.Count())
            }};

            return topProgramStrandsData;
        }
        public IEnumerable<ReportData> GetTopYearLevel()
        {
            var yearLevelGroups = bookings.Select(b => b.VisitorModel).OfType<Student>().GroupBy(e => e.YearGrade);

            var topYearLevelsData = new List<ReportData>() { new ReportData() {
                Categories = yearLevelGroups.Select(group => group.Key),
                Counts = yearLevelGroups.Select(group => group.Count())
            }};

            return topYearLevelsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrandAndYearLevel()
        {
            var programYearGroups = bookings.Select(b => b.VisitorModel).OfType<Student>()
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
            if (dateStart == null)
                dateStart = DateOnly.Parse("2022-01-01");
            if (dateEnd == null)
                dateEnd = DateOnly.Parse("2022-05-16");

            return dbContext.Bookings.Where(b => b.BookingDate >= dateStart && b.BookingDate <= dateEnd);
        }
    }
}
