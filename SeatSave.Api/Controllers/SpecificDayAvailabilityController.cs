using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return Ok(dbContext.SpecificDayAvailability);
        }

        [HttpGet("{isoDate}")]
        public IActionResult GetSpecific(string isoDate)
        {
            DateOnly parsedDate = DateOnly.ParseExact(isoDate, "yyyy-MM-dd");
            return Ok(dbContext.SpecificDayAvailability.Include(e => e.Periods).First(e => e.Date == parsedDate));
        }

        [HttpPost]
        public IActionResult Add([FromBody] SpecificDateAvailability availability)
        {
            if (availability == null) { return BadRequest(); }

            dbContext.SpecificDayAvailability.Add(availability);
            dbContext.SaveChanges();

            return Ok(availability);
        }

        [HttpPut("{isoDate}")]
        public IActionResult Update(string isoDate, SpecificDateAvailability availability)
        {
            DateOnly parsedDate = DateOnly.ParseExact(isoDate, "yyyy-MM-dd");
            if (parsedDate != availability.Date) { return BadRequest(); }

            dbContext.Entry(availability).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(availability);
        }
    }
}
