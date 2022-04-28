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
        private SeatModel seat = new SeatModel();
        private SeatModel seat2 = new SeatModel();

        public SeatsController(SeatSaveContext context)
        {
            this.context = context;


            seat.Id = 1;
            seat.Name = "ABC";
            seat.Type = "type1";
            seat.Active = "active";
            seat.Description = "desc";


            seat2.Id = 2;
            seat2.Name = "DEF";
            seat2.Type = "type1";
            seat2.Active = "active";
            seat2.Description = "desc2";
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            /*
            var seat = context.Seat.ToList();
            return Ok(seat);
            */
            List<SeatModel> seats = new List<SeatModel>();

            seats.Add(seat);
            seats.Add(seat2);
            return Ok(seats);

        }
        [HttpGet("{id}")]
        public IActionResult GetSpecific(int id) { return Ok("To be implemented"); }
        [HttpPost]
        public IActionResult Add() { return Ok("To be implemented"); }
        [HttpPut]
        public IActionResult Update() { return Ok("To be implemented"); }
        [HttpDelete]
        public IActionResult Delete() { return Ok("To be implemented"); }
    }
}
