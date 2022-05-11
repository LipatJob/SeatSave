using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Seat;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private SeatSaveContext context;

        public SeatsController(SeatSaveContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var seats = context.Seats.ToList();
            return Ok(seats);
        }

        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id)
        {
            var seat = context.Seats.Find(id);
            if (seat == null) { return NotFound(); }
            return Ok(seat);
        }

        [HttpPost]
        public IActionResult Add([FromBody] SeatModel seat)
        {
            if (seat == null) { return BadRequest(); }
            context.Seats.Add(seat);
            context.SaveChanges();
            return Ok(seat);
        }
        [HttpPut]
        public IActionResult Update([FromBody] SeatModel seat)
        {
            if (!context.Seats.Any(e => e.Id == seat.Id)) { return BadRequest(); }
            context.Entry(seat).State = EntityState.Modified;
            context.SaveChanges();
            return Ok(seat);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var seat = context.Seats.Find(id);
            if (seat == null) { return NotFound(); }

            context.Entry(seat).State = EntityState.Deleted;
            context.SaveChanges();
            return NoContent();
        }

        [HttpGet("Types")]
        public IActionResult GetTypes()
        {
            return Ok(SeatModelTypes.Types);
        }
    }
}
