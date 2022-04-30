namespace SeatSave.Core.Schedule
{
    public class PeriodFactory
    {
        static readonly TimeSpan openingTime = new TimeSpan(7, 0, 0);
        static readonly TimeSpan closingTime = new TimeSpan(12 + 5, 0, 0);
        static readonly TimeSpan periodDuration = new TimeSpan(1, 30, 0);


        public IList<Period> GetPeriodsInDay()
        {
            int id = 1;
            IList<Period> periods = new List<Period>();
            var currentPeriodStart = openingTime;
            TimeSpan currentPeriodEnd;
            do
            {
                currentPeriodEnd = currentPeriodStart + periodDuration;
                periods.Add(new Period(id, currentPeriodStart, currentPeriodEnd));
                currentPeriodStart = currentPeriodEnd;
                id += 1;
            } while (currentPeriodEnd < closingTime);

            return periods;
        }
    }
}
