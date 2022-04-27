using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() { return Ok("To be implemented"); }
        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id) { return Ok("To be implemented"); }
        [HttpPost]
        public IActionResult Add() { 
            
            // ESSENTIAL: convert user into visitor object
           //  if (user.UserGroup == Visitor.UserGroup)
            // {
               // var visitor = (Visitor)user;
                // visitor.Book(); // (date, period, seat)
            // }

            // STEPS:
            // 1. Get user credentials
            // 2. Get reservation details (date, period, seat)
            // 3. Check which user is the user (visitor or librarian)
            //    IF: visitor -> convert user to visitor object
            // 4. Pass booking details into Book() method 

            return Ok("To be implemented");
        }
        [HttpPut]
        public IActionResult Update() { return Ok("To be implemented"); }
        [HttpDelete]
        public IActionResult Delete() { return Ok("To be implemented"); }

    }
}
