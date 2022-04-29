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
            List<DateTime> availableDays = new List<DateTime>();
            for (int x = 0; x < 21; x++)
            {
                var currentDay = DateTime.Today.AddDays(x);
                if (IsUnavailable(currentDay))
                {
                    continue;
                }

                availableDays.Add(currentDay);
            }

            return Ok(availableDays);
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
            return Ok("");
        }
    }
}
