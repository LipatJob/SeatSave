using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{date}")]
        public IActionResult GetSpecific(string date)
        {
            var parsedDate = DateOnly.Parse(date);
            dbContext.SpecificDayAvailability.Find(parsedDate);
            return Ok(date);
        }

        /// <summary>
        /// Short, descriptive title of the operation
        /// </summary>
        /// <param name="date" example="2022-07-04">YYYY-MM-DD</param>
        [HttpPut("{date}")]
        public IActionResult Update(string date, SpecificDateAvailability availability)
        {
            DateOnly dateValue = DateOnly.Parse(date);
            if (dateValue != availability.Date) { return BadRequest(); }

            dbContext.Entry(availability).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(availability);
        }
    }
}
