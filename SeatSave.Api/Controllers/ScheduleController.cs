using Microsoft.AspNetCore.Mvc;
using SeatSave.Core.Schedule;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private SeatSaveContext dbContext;
        private ScheduleModel schedule;

        public ScheduleController(SeatSaveContext dbContext)
        {
            this.dbContext = dbContext;
            this.schedule = new ScheduleModel(dbContext.RegularDayOfWeekAvailability, dbContext.SpecificDayAvailability);
        }

        [HttpGet]
        public IActionResult GetAvailableDays()
        {
            return Ok(schedule.GetAvailableDays(DateOnly.FromDateTime(DateTime.Today), 21));
        }

        private bool IsUnavailable(DateTime currentDay)
        {
            // To be implemented
            return false;
        }

        [HttpGet("{isoDate}/Periods")]
        public IActionResult GetAvailablePeriodsForDay(string isoDate)
        {
            var date = DateOnly.Parse(isoDate);
            return Ok(schedule.GetAvailablePeriods(date, DateOnly.FromDateTime(DateTime.Today)));
        }

        [HttpGet("periods")]
        public IActionResult GetPeriods()
        {
            return Ok(new PeriodFactory().GetPeriodsInDay());
        }

        [HttpGet("{isoDate}/{periodId}/Seat")]
        public IActionResult GetBookableSeats(string isoDate, int periodId)
        {
            return Ok(dbContext.Seat);
        }

        [HttpGet("Periods/Present")]
        public IActionResult GetPresentPeriod()
        {
            var currentDateTime = new DateTime(2022, 04, 29, 13, 30, 0); // FOR TESTING
            //var currentDateTime = DateTime.Now;
            var currentTime = new TimeOnly(currentDateTime.Hour, currentDateTime.Minute, currentDateTime.Second);
            return Ok(new PeriodFactory().GetPeriodsInDay().Where(p => p.TimeStart <= currentTime && p.TimeEnd >= currentTime));
        }
    }
}
