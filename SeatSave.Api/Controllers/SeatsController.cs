using Microsoft.AspNetCore.Mvc;
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
            var seat = context.Seat.ToList();
            return Ok(seat);
        }

        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id)
        {

            var seat = context.Seat.Find(id);
            return Ok(seat);

        }
        [HttpPost]
        public IActionResult Add()
        {
            // [FromBody] SeatModel seat
            /*
            context.Seat.Add(seat);
            context.SaveChanges();
            return Ok(seat);
            */
            return Ok("To be implemented");
        }
        [HttpPut]
        public IActionResult Update()
        {
            // [FromBody] SeatModel seat
            /*
            context.Seat.Update(seat);
            context.SaveChanges();
            return Ok(seat);
            */
            /*
            var seat = context.Seat.FirstOrDefault(e => e.Id == ID);
            seat.Name = newName;
            context.SaveChanges();
            */

            return Ok("To be implemented");
        }
        [HttpDelete]
        public IActionResult Delete()
        {
            // [FromBody] SeatModel seat
            /*
            context.Seat.Remove(seat);
            context.SaveChanges();
            return Ok(seat);
            */
            return Ok("To be implemented");
        }
    }
}
