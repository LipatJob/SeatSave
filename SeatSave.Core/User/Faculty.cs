namespace SeatSave.Core.User
{
    public class Faculty : Visitor
    {
        public static string UserType = "Faculty";
        public Faculty() : base(UserType)
        {
        }

        public string Department { get; set; }
    }
}