using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentReportController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll([FromQuery] DateOnly dateStart, [FromQuery] DateOnly dateEnd) { return Ok("Sample output"); }

        [HttpGet("Excel")]
        public IActionResult GetExcel([FromQuery] DateOnly dateStart, [FromQuery] DateOnly dateEnd) { return Ok("To be implemented"); }
    }
}
