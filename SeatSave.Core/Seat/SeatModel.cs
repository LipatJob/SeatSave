namespace SeatSave.Core.Seat
{
    public class SeatModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public bool Active { get; set; }
        public string? Description { get; set; }
    }

    public class SeatModelTypes
    {
        const string CarrelDeskWithOutlet = "Carrel Desk with Outlet";
        const string CarrelDesk = "Carrel Desk";
        public static string[] GetTypes => new[] { CarrelDesk, CarrelDeskWithOutlet };
    }
}
