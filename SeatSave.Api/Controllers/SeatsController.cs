using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() { return Ok("To be implemented"); }
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
