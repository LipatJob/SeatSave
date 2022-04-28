﻿using Microsoft.AspNetCore.Mvc;
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
            return Ok(dbContext.Bookings); 
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
