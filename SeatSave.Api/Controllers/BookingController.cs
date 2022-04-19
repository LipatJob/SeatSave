using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
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

        [HttpGet]
        public void GetForVisitor() { }
        [HttpGet]
        public void GetActiveForVisitor() { }
    }
}
