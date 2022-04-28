using Microsoft.AspNetCore.Mvc;
using SeatSave.Core.Schedule;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/availability/[controller]")]
    [ApiController]
    public class RegularDayAvailabilityController : ControllerBase
    {
        private SeatSaveContext dbContext;

        public RegularDayAvailabilityController(SeatSaveContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(dbContext.RegularDayOfWeekAvailability);
        }

        [HttpGet("{dayOfWeek}")]
        public IActionResult GetSpecific(DayOfWeek dayOfWeek)
        {
            return Ok(dbContext.RegularDayOfWeekAvailability.Find(dayOfWeek));
        }

        [HttpPut("{dayOfWeek}")]
        public IActionResult Update(DayOfWeek dayOfWeek, RegularDayOfWeekAvailability availability)
        {
            if (availability.DayOfWeek != dayOfWeek) { return BadRequest(); }

            dbContext.Entry(availability).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(availability);
        }
    }
}
