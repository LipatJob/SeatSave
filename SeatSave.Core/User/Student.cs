namespace SeatSave.Core.User
{

    public class Student : Visitor
    {
        public static string UserType = "Student";

        public Student() : base(UserType)
        {
        }

        public string Program { get; set; }
        public int Year { get; set; }
    }
}
