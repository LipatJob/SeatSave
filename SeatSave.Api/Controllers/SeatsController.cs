﻿using Microsoft.AspNetCore.Mvc;
using SeatSave.EF;
using SeatSave.Core.Seat;

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
        public IActionResult Add([FromBody] SeatModel seat)
        {
            context.Seat.Add(seat);
            context.SaveChanges();
            return Ok(seat);
        }
        [HttpPut]
        public IActionResult Update([FromBody] SeatModel seat)
        {
            context.Entry(seat).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
            return Ok(seat);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var seat = context.Seat.Find(id);
            context.Entry(seat).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            context.SaveChanges();
            return NoContent();
        }
    }
}
