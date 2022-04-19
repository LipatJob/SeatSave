using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/availability/[controller]")]
    [ApiController]
    public class RegularDayAvailabilityController : ControllerBase
    {
        [HttpGet]
        public void GetAll() { /* TODO */ }
        [HttpGet]
        public void GetSpecific() { /* TODO */ }
        [HttpPost]
        public void Add() { /* TODO */ }
        [HttpPut]
        public void Update() { /* TODO */ }
        [HttpDelete]
        public void Delete() { /* TODO */ }
    }
}
