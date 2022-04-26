using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAvailableDays() { 
            List<DateTime> availableDays = new List<DateTime>();
            for(int x = 0; x < 21; x++)
            {
                var currentDay = DateTime.Today.AddDays(x);
                if (IsUnavailable(currentDay))
                {
                    continue;
                }

                availableDays.Add(currentDay);
            }

            return Ok(availableDays);
        }

        private bool IsUnavailable(DateTime currentDay)
        {
            // To be implemented
            return false;
        }

        [HttpGet("{id}/periods")]
        public IActionResult GetAvailablePeriodsForDay() {
            return Ok("To be implemented");
        }

        [HttpGet("periods")]
        public IActionResult GetPeriods() { 
            return Ok("To be implemented");
        }
    }
}
