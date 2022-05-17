using Microsoft.AspNetCore.Mvc;
using SeatSave.Api.Services;
using SeatSave.EF;
using SeatSave.Core.User;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentReportController : ControllerBase
    {
        private SeatSaveContext dbContext;
        private StudentReportService reportService;

        public StudentReportController(SeatSaveContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] string? dateStartString = null, [FromQuery] string? dateEndString = null, [FromQuery] bool uniqueCount = false)
        {
            DateOnly? dateStart = null;
            DateOnly? dateEnd = null;

            if (dateStartString != null)
                dateStart = DateOnly.Parse(dateStartString);
            if (dateEndString != null)
                dateEnd = DateOnly.Parse(dateEndString);

            reportService = new StudentReportService(dbContext, dateStart, dateEnd);
            
            var topDepartmentsData = reportService.GetTopDepartments(uniqueCount);
            var topProgramStrandsData = reportService.GetTopProgramStrands(uniqueCount);
            var topYearLevelsData = reportService.GetTopYearLevel(uniqueCount);
            var topProgramYearsData = reportService.GetTopProgramStrandAndYearLevel(uniqueCount);
            
            return Ok(topDepartmentsData.Concat(topProgramStrandsData).Concat(topYearLevelsData).Concat(topProgramYearsData));
        }

        [HttpGet("Excel")]
        public IActionResult GetExcel([FromQuery] string? dateStartString = null, [FromQuery] string? dateEndString = null) { return Ok("To be implemented"); }
    }
}
