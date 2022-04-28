namespace SeatSave.Core.Booking
{
    public class StatusHistory
    {
        public int Id { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public DateTime? DateTimeCanceled { get; set; }
        public DateTime? DateTimeCheckedIn { get; set; }
        public DateTime? DateTimeCheckedOut { get; set; }
    }
}
