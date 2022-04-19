using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.Booking
{
    public class BookablePolicy
    {
        public bool IsSatisfied(DateTime date, Period period, SeatModel seat) { throw new NotImplementedException("TODO"); }
    }
}
