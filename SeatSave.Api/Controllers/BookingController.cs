using Microsoft.AspNetCore.Mvc;
using SeatSave.Core.Schedule;
using SeatSave.EF;

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
        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id)
        {
            return Ok(dbContext.Bookings.Find(id));
        }
        [HttpPost]
        public IActionResult Add()
        {

            /*
            if (user.UserGroup == Visitor.UserGroup)
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

            return Ok("To be implemented");
        }
        [HttpPut]
        public IActionResult Update() { return Ok("To be implemented"); }
        [HttpDelete]
        public IActionResult Delete() { return Ok("To be implemented"); }
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
        [HttpGet("Present")]
        public IActionResult PresentBookings()
        {
            var currentDateTime = new DateTime(2022, 04, 29, 13, 30, 0);
            var currentDate = DateOnly.FromDateTime(currentDateTime);
            var currentTime = new TimeSpan(currentDateTime.Hour, currentDateTime.Minute, currentDateTime.Second);
            
            return Ok(dbContext.Bookings.Where(b => b.BookingDate == currentDate && b.Period.TimeStart <= currentTime && b.Period.TimeEnd >= currentTime));
        }

    }
}
