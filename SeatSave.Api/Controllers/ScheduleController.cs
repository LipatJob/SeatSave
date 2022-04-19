using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAvailableDays() { throw new NotImplementedException("TODO"); }

        [HttpGet("{id}/periods")]
        public IActionResult GetAvailablePeriodsForDay() { throw new NotImplementedException("TODO"); }

        [HttpGet("periods")]
        public IActionResult GetPeriods() { throw new NotImplementedException("TODO"); }
    }
}
