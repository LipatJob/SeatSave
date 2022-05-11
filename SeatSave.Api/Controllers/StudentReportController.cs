using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentReportController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(DateOnly dateStart, DateOnly dateEnd) { return Ok("Sample output"); }

        [HttpGet("Excel")]
        public IActionResult GetExcel(DateOnly dateStart, DateOnly dateEnd) { return Ok("To be implemented"); }
    }
}
