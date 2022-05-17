using Microsoft.AspNetCore.Mvc;
using SeatSave.Api.DTO;
using SeatSave.Api.Services;
using SeatSave.Core.Booking;
using SeatSave.Core.Schedule;
using SeatSave.Core.User;
using SeatSave.EF;
using System.Security.Claims;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly SeatSaveContext dbContext;
        private readonly IEmailService emailService;
        private readonly BookingService bookingService;


        public BookingController(SeatSaveContext dbContext, IEmailService emailService)
        {
            this.dbContext = dbContext;
            this.emailService = emailService;
            var currentDate = DateOnly.FromDateTime(DateTime.Now);
            var schedule = new ScheduleModel(dbContext.RegularDayOfWeekAvailability, dbContext.SpecificDayAvailability);
            bookingService = new BookingService(currentDate, schedule, dbContext.Bookings, dbContext.Seats);
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

            var activeBooking = visitor.GetActiveBooking();
            if (activeBooking == null)
            {
                return NoContent();
            }

            activeBooking.VisitorModel = null;
            return Ok(activeBooking);
        }

        [HttpPost]
        public IActionResult Add([FromBody] BookingDTO bookingDTO)
        {
            Visitor visitor;
            if (!TryGetCurrentVisitor(out visitor)) { return BadRequest(); }

            var bookingDate = DateOnly.Parse(bookingDTO.isoDate);
            var period = dbContext.Periods.Find(bookingDTO.periodId);
            var seat = dbContext.Seats.Find(bookingDTO.seatId);

            if (!bookingService.IsValidBooking(bookingDate, period, seat, visitor)) { return BadRequest(); }
            var booking = bookingService.book(bookingDate, period, seat, visitor);

            dbContext.Bookings.Add(booking);
            dbContext.SaveChanges();

            emailService.SendConfirmationMessage(visitor.Email, booking);

            return Ok(booking);
        }

        private bool TryGetCurrentVisitor(out Visitor? visitor)
        {
            visitor = null;
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return false;
            }

            var userClaims = identity.Claims;
            var user = AuthService.CreateUserModelFromClaims(userClaims);
            visitor = dbContext.Visitors.Find(user.Id);
            if (visitor == null)
            {
                return false;
            }

            return true;
        }

        [HttpPatch("{id}")]
        public IActionResult PatchStatus([FromRoute] int id, [FromBody] string status)
        {
            var booking = dbContext.Bookings.Find(id);
            if (booking == null) { return NotFound(); }
            // if (!CanCurrentUserPatchBooking(booking)) { return Unauthorized(); } // DISABLE FOR EASIER DEBUGGING

            var currentDateTime = DateTime.Now;
            switch (status)
            {
                case BookingModel.CheckedInStatus:
                    booking.CheckIn(currentDateTime);
                    break;
                case BookingModel.CancelledStatus:
                    booking.Cancel(currentDateTime);
                    break;
                case BookingModel.CheckedOutStatus:
                    booking.CheckOut(currentDateTime);
                    break;
                default:
                    return BadRequest("Invalid status");
            }

            dbContext.SaveChanges();

            return Ok();
        }

        [HttpPatch]
        public IActionResult ExpireBookings(string action)
        {
            if (action == "Expire")
            {
                BookingExpirationService expirationService = new BookingExpirationService(dbContext.Bookings);
                var bookingsToBeExpired = expirationService.ExpireBookings();
                dbContext.SaveChanges();
                return Ok(bookingsToBeExpired);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool CanCurrentUserPatchBooking(BookingModel booking, string newStatus)
        {
            // get current user
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null) { return false; }
            var userClaims = identity.Claims;
            var authUser = AuthService.CreateUserModelFromClaims(userClaims);
            var user = dbContext.Users.Find(authUser.Id);
            if (user == null) { return false; }

            // get user group of user
            string userGroup = user.UserGroup;

            // verify
            if (userGroup == Librarian.UserGroup) { return true; }
            if (userGroup == Visitor.UserGroup)
            {
                if (newStatus == BookingModel.CheckedInStatus) { return false; }
                return booking.VisitorId == user.Id;
            }

            return false;
        }

        [HttpPut]
        public IActionResult Update() { return Ok("To be implemented"); }
        [HttpDelete]
        public IActionResult Delete() { return Ok("To be implemented"); }

        [HttpGet("Search")]
        public IActionResult SearchBookings([FromQuery] string? code = null, [FromQuery] string? status = null, [FromQuery] string? date = null, [FromQuery] string? email = null)
        {
            DateOnly bookingDate = new DateOnly(1, 1, 1);
            if (date != null)
                bookingDate = DateOnly.Parse(date);

            var results = dbContext.Bookings
                            .Where(b =>
                                (code == null || b.BookingCode.Contains(code)) &&
                                (status == null || b.Status == status) &&
                                (date == null || b.BookingDate == bookingDate) &&
                                (email == null || b.VisitorModel.Email.ToLower().Contains(email.ToLower()))
                                )
                            .OrderByDescending(b => b.Id);

            return Ok(results);
        }
        [HttpGet("Present")]
        public IActionResult GetPresentBookings()
        {
            var currentDateTime = new DateTime(2022, 04, 29, 13, 30, 0); // FOR TESTING
            //var currentDateTime = DateTime.Now;
            var currentDate = DateOnly.FromDateTime(currentDateTime);
            var currentTime = new TimeOnly(currentDateTime.Hour, currentDateTime.Minute, currentDateTime.Second);

            var pendingBookings = dbContext.Bookings.Where(b => b.BookingDate == currentDate && b.Period.TimeStart <= currentTime && b.Period.TimeEnd >= currentTime && b.Status == BookingModel.PendingStatus);
            var checkedInBookings = dbContext.Bookings.Where(b => b.BookingDate == currentDate && b.Period.TimeStart <= currentTime && b.Period.TimeEnd >= currentTime && b.Status == BookingModel.CheckedInStatus);
            var checkedOutBookings = dbContext.Bookings.Where(b => b.BookingDate == currentDate && b.Period.TimeStart <= currentTime && b.Period.TimeEnd >= currentTime && b.Status == BookingModel.CheckedOutStatus);
            var cancelledBookings = dbContext.Bookings.Where(b => b.BookingDate == currentDate && b.Period.TimeStart <= currentTime && b.Period.TimeEnd >= currentTime && b.Status == BookingModel.CancelledStatus);

            return Ok(pendingBookings.Concat(checkedInBookings).Concat(checkedOutBookings).Concat(cancelledBookings));
        }

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
