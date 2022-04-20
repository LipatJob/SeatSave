using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAvailableDays() { return Ok("To be implemented"); }

        [HttpGet("{id}/periods")]
        public IActionResult GetAvailablePeriodsForDay() { return Ok("To be implemented"); }

        [HttpGet("periods")]
        public IActionResult GetPeriods() { return Ok("To be implemented"); }
    }
}
