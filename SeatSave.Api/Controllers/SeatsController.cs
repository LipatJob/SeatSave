using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() { throw new NotImplementedException("TODO"); }
        [HttpGet]
        public IActionResult GetSpecific() { throw new NotImplementedException("TODO"); }
        [HttpPost]
        public IActionResult Add() { throw new NotImplementedException("TODO"); }
        [HttpPut]
        public IActionResult Update() { throw new NotImplementedException("TODO"); }
        [HttpDelete]
        public IActionResult Delete() { throw new NotImplementedException("TODO"); }
    }
}
