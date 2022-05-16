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
        public IActionResult GetAll([FromQuery] string? dateStartString = null, [FromQuery] string? dateEndString = null)
        {
            reportService = new StudentReportService(dbContext, DateOnly.Parse("2022-01-01"), DateOnly.Parse("2022-05-14"));
            return Ok(reportService.GetTopDepartments());
        }

        [HttpGet("Excel")]
        public IActionResult GetExcel([FromQuery] string? dateStartString = null, [FromQuery] string? dateEndString = null) { return Ok("To be implemented"); }
    }
}
