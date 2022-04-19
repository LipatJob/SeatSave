namespace SeatSave.Core.User
{

    public class Student : Visitor
    {
        public const string UserType = "Student";

        public Student() : base(UserType)
        {
        }

        public string Program { get; set; }
        public int Year { get; set; }
    }
}
