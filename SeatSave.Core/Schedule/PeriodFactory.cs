namespace SeatSave.Core.Schedule
{
    public class PeriodFactory
    {
        static readonly TimeOnly openingTime = new TimeOnly(7, 0, 0);
        static readonly TimeOnly closingTime = new TimeOnly(12 + 5, 0, 0);
        static readonly TimeSpan periodDuration = new TimeSpan(1, 30, 0);


        public IList<Period> GetPeriodsInDay()
        {
            int idCount = 1;
            IList<Period> periods = new List<Period>();
            var currentPeriodStart = openingTime;
            TimeOnly currentPeriodEnd;
            do
            {
                currentPeriodEnd = currentPeriodStart.Add(periodDuration);
                periods.Add(new Period { id = idCount, TimeStart = currentPeriodStart, TimeEnd = currentPeriodEnd }); ;
                currentPeriodStart = currentPeriodEnd;
                idCount += 1;
            } while (currentPeriodEnd < closingTime);

            return periods;
        }
    }
}
