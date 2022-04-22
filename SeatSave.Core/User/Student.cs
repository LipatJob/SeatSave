namespace SeatSave.Core.User
{

    public class Student : Visitor
    {
        public const string UserType = "Student";

        public Student() : base(UserType)
        {
        }

        public string ProgramStrand { get; set; }
        public string YearGrade { get; set; }
    }
}
