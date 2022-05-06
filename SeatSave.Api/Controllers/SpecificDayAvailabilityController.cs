using Microsoft.AspNetCore.Mvc;
using SeatSave.Core.Schedule;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/Availability/SpecificDay")]
    [ApiController]
    public class SpecificDayAvailabilityController : ControllerBase
    {
        private SeatSaveContext dbContext;

        public SpecificDayAvailabilityController(SeatSaveContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(dbContext.SpecificDayAvailability.Select(e => e.Date).OrderBy(e => e));
        }


        [HttpDelete("{isoDate}")]
        public IActionResult DeleteDate([FromRoute] string isoDate)
        {
            bool isDateValid = DateOnly.TryParseExact(isoDate, "yyyy-MM-dd", out var date);
            if (!isDateValid) { return BadRequest(); }

            var availability = dbContext.SpecificDayAvailability.Find(date);
            if (availability == null) { return NotFound(); }

            dbContext.SpecificDayAvailability.Remove(availability);
            dbContext.SaveChanges();

            return Ok(date);
        }

        [HttpPost]
        public IActionResult Add([FromBody] string isoDate = "2022-01-01")
        {
            bool isDateValid = DateOnly.TryParseExact(isoDate, "yyyy-MM-dd", out var date);
            if (!isDateValid) { return BadRequest("Invalid date format"); }

            if (dbContext.SpecificDayAvailability.Find(date) != null) { return BadRequest("Duplicate date value"); }

            dbContext.SpecificDayAvailability.Add(new SpecificDateAvailability { Date = date, Periods = new List<Period>() });
            dbContext.SaveChanges();

            return Ok(date);
        }

        [HttpGet("{isoDate}/periods")]
        public IActionResult GetPeriods(string isoDate)
        {
            bool isDateValid = DateOnly.TryParseExact(isoDate, "yyyy-MM-dd", out var date);
            if (!isDateValid) { return BadRequest(); }

            var availability = dbContext.SpecificDayAvailability.Find(date);
            if (availability == null) { return BadRequest("Date not found"); }

            return Ok(availability.Periods.OrderBy(e => e.TimeStart));
        }


        [HttpPut("{isoDate}/periods")]
        public IActionResult UpdatePeriods([FromRoute] string isoDate, IList<Period> periods)
        {
            // Validate and Parse ISO Date
            bool isDateValid = DateOnly.TryParseExact(isoDate, "yyyy-MM-dd", out var date);
            if (!isDateValid) { return BadRequest("Invalid date format"); }

            // Validate date exists
            var availability = dbContext.SpecificDayAvailability.Find(date);
            if (availability == null) { return BadRequest("Date not found"); }

            // Add periods to entity
            foreach (var period in periods) { dbContext.Attach<Period>(period); }
            availability.Periods.Clear();
            foreach (var period in periods) { availability.Periods.Add(period); }

            dbContext.SaveChanges();
            return Ok(availability.Periods.OrderBy(e => e.TimeStart));
        }
    }
}
