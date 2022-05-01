﻿namespace SeatSave.Core.Schedule
{
    public class PeriodFactory
    {
        static readonly TimeOnly openingTime = new TimeOnly(7, 0, 0);
        static readonly TimeOnly closingTime = new TimeOnly(12 + 5, 0, 0);
        static readonly TimeOnly periodDuration = new TimeOnly(1, 30, 0);


        public IList<Period> GetPeriodsInDay()
        {
            int id = 1;
            IList<Period> periods = new List<Period>();
            var currentPeriodStart = openingTime;
            TimeOnly currentPeriodEnd;
            do
            {
                currentPeriodEnd = currentPeriodStart.AddHours(1).AddMinutes(30);
                periods.Add(new Period(id, currentPeriodStart, currentPeriodEnd));
                currentPeriodStart = currentPeriodEnd;
                id += 1;
            } while (currentPeriodEnd < closingTime);

            return periods;
        }
    }
}
