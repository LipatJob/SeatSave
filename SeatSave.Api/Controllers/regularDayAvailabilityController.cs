using Microsoft.AspNetCore.Mvc;
using SeatSave.Core.Schedule;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/Availability/RegularDay")]
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
            return Ok(dbContext.RegularDayOfWeekAvailability.Select(e => e.DayOfWeek));
        }

        [HttpGet("{dayOfWeek}/Periods")]
        public IActionResult GetDayOfWeekPeriods([FromRoute] DayOfWeek dayOfWeek)
        {
            var availability = dbContext.RegularDayOfWeekAvailability.Find(dayOfWeek);
            if (availability == null) { return BadRequest("Day of week not found"); }

            return Ok(availability.Periods);
        }

        [HttpPut("{dayOfWeek}/Periods")]
        public IActionResult UpdatePeriods([FromRoute] DayOfWeek dayOfWeek, IList<Period> periods)
        {
            // Validate date exists
            var availability = dbContext.SpecificDayAvailability.Find(dayOfWeek);
            if (availability == null) { return BadRequest("Day of week not found"); }

            // Add periods to entity
            foreach (var period in periods) { dbContext.Attach<Period>(period); }
            availability.Periods.Clear();
            foreach (var period in periods) { availability.Periods.Add(period); }

            dbContext.SaveChanges();
            return Ok(availability.Periods);
        }
    }
}
