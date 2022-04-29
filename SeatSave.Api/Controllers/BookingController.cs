﻿using Microsoft.AspNetCore.Mvc;
using SeatSave.EF;
using System.Linq;

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
        public IActionResult Search([FromQuery] int id = 0, [FromQuery] string status = "", [FromQuery] string date = "", [FromQuery] string email = "") 
        { 
            int year = int.Parse(date.Substring(0,4));
            int month = int.Parse(date.Substring(5,2));
            int day = int.Parse(date.Substring(8,2));
            DateOnly bookingDate = new DateOnly(year, month, day);

            var results = dbContext.Bookings
                            .Where( b => 
                                (id == 0 || b.Id == id) &&
                                (status == "" || b.Status == status) && 
                                (date == "" || b.BookingDate == bookingDate) &&
                                (email == "" || b.UserModel.Email == email)
                                )
                            .OrderByDescending(b => b.Id);
            
            return Ok(results);
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

    }
}
