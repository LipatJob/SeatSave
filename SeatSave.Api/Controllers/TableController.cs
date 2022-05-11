using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeatSave.Core.Seat;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private SeatSaveContext context;

        public TableController(SeatSaveContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var seats = context.Tables.ToList();
            return Ok(seats);
        }

        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id)
        {
            var table = context.Tables.Find(id);
            if (table == null) { return NotFound(); }
            return Ok(table);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Table table)
        {
            if (table == null) { return BadRequest(); }
            context.Tables.Add(table);
            context.SaveChanges();
            return Ok(table);
        }
        [HttpPut]
        public IActionResult Update([FromBody] Table table)
        {
            if (!context.Tables.Any(e => e.Id == table.Id)) { return BadRequest(); }
            context.Entry(table).State = EntityState.Modified;
            context.SaveChanges();
            return Ok(table);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var table = context.Tables.Find(id);
            if (table == null) { return NotFound(); }

            context.Entry(table).State = EntityState.Deleted;
            context.SaveChanges();
            return NoContent();
        }
    }
}
