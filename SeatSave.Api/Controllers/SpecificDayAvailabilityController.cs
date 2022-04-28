using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Schedule;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/availability/[controller]")]
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

        /// <summary>
        /// Short, descriptive title of the operation
        /// </summary>
        /// <param name="date" example="2022-07-04">YYYY-MM-DD</param>
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
