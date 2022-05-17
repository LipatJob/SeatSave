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
    public class ExcelData
    {
        public string Category { get; set; }
        public int Count { get; set; }
    }

    public class StudentReportService
    {
        private readonly SeatSaveContext dbContext;
        private readonly DateOnly? dateStart;
        private readonly DateOnly? dateEnd;

        public StudentReportService(SeatSaveContext dbContext, DateOnly? dateStart, DateOnly? dateEnd)
        {
            this.dbContext = dbContext;
            this.dateStart = dateStart;
            this.dateEnd = dateEnd;
        }

        public IEnumerable<Student> GetStudentsData(bool uniqueCount)
        {
            DateOnly minDate = dbContext.Bookings.Min(b => b.BookingDate);
            DateOnly maxDate = dbContext.Bookings.Max(b => b.BookingDate);

            DateOnly? start;
            DateOnly? end;

            if (dateStart == null)
                start = minDate;
            else
                start = dateStart;

            if (dateEnd == null)
                end = maxDate;
            else
                end = dateEnd;

            if (uniqueCount)
                return dbContext.Bookings.Where(b => b.BookingDate >= start && b.BookingDate <= end)
                        .Where(b => b.Status == BookingModel.CheckedOutStatus)
                        .Select(b => b.VisitorModel).Distinct().OfType<Student>();
            else
                return dbContext.Bookings.Where(b => b.BookingDate >= start && b.BookingDate <= end)
                        .Where(b => b.Status == BookingModel.CheckedOutStatus)
                        .Select(b => b.VisitorModel).OfType<Student>();
        }
        public IEnumerable<ReportData> GetTopDepartments(bool uniqueCount)
        {
            var departmentGroups = GetStudentsData(uniqueCount).GroupBy(e => e.Department).OrderByDescending(group => group.Count());

            var topDepartmentsData = new List<ReportData>() { new ReportData() {
                Categories = departmentGroups.Select(group => group.Key),
                Counts = departmentGroups.Select(group => group.Count())
            }};

            return topDepartmentsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrands(bool uniqueCount)
        {
            var programStrandsGroups = GetStudentsData(uniqueCount).GroupBy(e => e.ProgramStrand).OrderByDescending(group => group.Count());

            var topProgramStrandsData = new List<ReportData>() { new ReportData() {
                Categories = programStrandsGroups.Select(group => group.Key),
                Counts = programStrandsGroups.Select(group => group.Count())
            }};

            return topProgramStrandsData;
        }
        public IEnumerable<ReportData> GetTopYearLevel(bool uniqueCount)
        {
            var yearLevelGroups = GetStudentsData(uniqueCount).GroupBy(e => e.YearGrade).OrderByDescending(group => group.Count());

            var topYearLevelsData = new List<ReportData>() { new ReportData() {
                Categories = yearLevelGroups.Select(group => group.Key),
                Counts = yearLevelGroups.Select(group => group.Count())
            }};

            return topYearLevelsData;
        }
        public IEnumerable<ReportData> GetTopProgramStrandAndYearLevel(bool uniqueCount)
        {
            var programYearGroups = GetStudentsData(uniqueCount)
                .GroupBy(e => new { e.ProgramStrand, e.YearGrade }, (key, group) => new
                {
                    Category = key.ProgramStrand + " - " + key.YearGrade,
                    Count = group.Count()
                }).OrderByDescending(e => e.Count);

            var topProgramYearsData = new List<ReportData>() { new ReportData() {
                Categories = programYearGroups.Select(e => e.Category),
                Counts = programYearGroups.Select(e => e.Count)
            }};

            return topProgramYearsData;
        }
        public IEnumerable<ExcelData> GetExcelDepartments(bool uniqueCount)
        {
            return GetStudentsData(uniqueCount).GroupBy(e => e.Department)
                .Select(group => new ExcelData()
                { Category = group.Key, Count = group.Count() })
                .OrderByDescending(e => e.Count);
        }
        public IEnumerable<ExcelData> GetExcelProgramStrands(bool uniqueCount)
        {
            return GetStudentsData(uniqueCount).GroupBy(e => e.ProgramStrand)
                .Select(group => new ExcelData()
                { Category = group.Key, Count = group.Count() })
                .OrderByDescending(e => e.Count);
        }
        public IEnumerable<ExcelData> GetExcelYearLevel(bool uniqueCount)
        {
            return GetStudentsData(uniqueCount).GroupBy(e => e.YearGrade)
                .Select(group => new ExcelData()
                { Category = group.Key, Count = group.Count() })
                .OrderByDescending(e => e.Count);
        }
        public IEnumerable<ExcelData> GetExcelProgramStrandAndYearLevel(bool uniqueCount)
        {
            return GetStudentsData(uniqueCount)
                .GroupBy(e => new { e.ProgramStrand, e.YearGrade }, (key, group) => new
                {
                    Category = key.ProgramStrand + " - " + key.YearGrade,
                    Count = group.Count()
                })
                .Select(group => new ExcelData()
                { Category = group.Category, Count = group.Count })
                .OrderByDescending(e => e.Count);
        }
    }
}
