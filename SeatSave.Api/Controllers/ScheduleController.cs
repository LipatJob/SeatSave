using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        public void GetAvailableDays() { }

        public void GetAvailablePeriodsForDay() { }

        public void GetPeriods() { }
    }
}
