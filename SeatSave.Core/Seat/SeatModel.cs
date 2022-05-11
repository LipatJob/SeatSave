namespace SeatSave.Core.Seat
{
    public class SeatModel : MapItem
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public bool Active { get; set; }
        public string? Description { get; set; }
    }
}
