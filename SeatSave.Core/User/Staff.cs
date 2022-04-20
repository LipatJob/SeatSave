namespace SeatSave.Core.User
{
    public class Staff : Visitor
    {
        public const string UserType = "Staff";

        public Staff() : base(UserType)
        {
        }

        public string Office { get; set; }
    }
}
