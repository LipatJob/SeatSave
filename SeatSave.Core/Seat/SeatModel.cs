namespace SeatSave.Core.Seat
{
    public class SeatModel : MapItem
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public bool Active { get; set; }
        public string? Description { get; set; }
    }

    public class SeatModelTypes
    {
        public const string CarrelDeskWithOutlet = "Carrel Desk with Outlet";
        public const string CarrelDesk = "Carrel Desk";
        public static string[] Types => new[] { CarrelDesk, CarrelDeskWithOutlet };
    }
}
