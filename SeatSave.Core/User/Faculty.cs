namespace SeatSave.Core.User
{
    public class Faculty : Visitor
    {
        public const string UserType = "Faculty";
        public Faculty() : base(UserType)
        {
        }

        public string FacultyOffice { get; set; }
    }
}