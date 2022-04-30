using Microsoft.AspNetCore.Mvc;
using SeatSave.EF;
using SeatSave.Api.DTO;
using System.Security.Claims;
using SeatSave.Api.Services;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private SeatSaveContext dbContext;

        public BookingController(SeatSaveContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(dbContext.Bookings.OrderByDescending(b => b.Id));
        }
        [HttpGet("Search")]
        public IActionResult Search([FromQuery] int? id = null, [FromQuery] string? status = null, [FromQuery] string? date = null, [FromQuery] string? email = null)
        {

            DateOnly bookingDate = new DateOnly(1, 1, 1);
            if (date != null)
            {
                bookingDate = DateOnly.Parse(date);
            }

            var results = dbContext.Bookings
                            .Where(b =>
                                (id == null || b.Id == id) &&
                                (status == null || b.Status == status) &&
                                (date == null || b.BookingDate == bookingDate) &&
                                (email == null || b.UserModel.Email.ToLower() == email.ToLower())
                                )
                            .OrderByDescending(b => b.Id);

            return Ok(results);
        }
        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id)
        {
            return Ok(dbContext.Bookings.Find(id));
        }

        [HttpGet("Current")]
        public IActionResult GetCurrentBooking()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return BadRequest();
            }

            var userClaims = identity.Claims;
            var user = AuthService.CreateUserModelFromClaims(userClaims);
            var visitor = dbContext.Visitors.Find(user.Id);

            if (visitor == null)
            {
                return BadRequest();
            }
            
            return Ok(visitor.GetActiveBooking());
        }

        [HttpPost]
        public IActionResult Add([FromBody] BookingDTO bookingDTO)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return BadRequest();
            }

            var userClaims = identity.Claims;
            var user = AuthService.CreateUserModelFromClaims(userClaims);
            var visitor = dbContext.Visitors.Find(user.Id);

            if (visitor == null)
            {
                return BadRequest();
            }

            var booking = visitor.Book(DateTime.Now, DateOnly.Parse(bookingDTO.isoDate), bookingDTO.periodId, bookingDTO.seatId);
            dbContext.SaveChanges();
            return Ok(booking);
        }

        [HttpPut]
        public IActionResult Update() { return Ok("To be implemented"); }
        [HttpDelete]
        public IActionResult Delete() { return Ok("To be implemented"); }

    }
}

/*
            if (user.UserGroup == Visitor.UserGroyup)
            {
                var visitor = (Visitor)user;
                visitor.Book(); // (date, period, seat)
            }
            */

// STEPS:
// 1. Get user credentials
// 2. Get reservation details (date, period, seat)
// 3. Check which user is the user (visitor or librarian)
//    IF: visitor -> convert user to visitor object
// 4. Pass booking details into Book() method 
