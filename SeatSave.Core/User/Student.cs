namespace SeatSave.Core.User
{

    public class Student : Visitor
    {
        public const string UserType = "Student";

        public static IEnumerable<string> YearLevels = new HashSet<string>{
            "First Year",
            "Second Year",
            "Third Year",
            "Fourth Year",
            "Fifth Year",
        };

        public static IEnumerable<string> GradeLevels = new HashSet<string>{
            "Grade 11",
            "Grade 12",
        };

        public static IEnumerable<string> Departments => ProgramStrands.Keys;

        public static Dictionary<string, HashSet<string>> ProgramStrands = new Dictionary<string, HashSet<string>>{
            {"MITL", new HashSet<string>{
                "B.S. ARCHITECTURE",
                "B.S. CHEMICAL ENGINEERING",
                "B.S. CIVIL ENGINEERING",
                "B.S. COMPUTER ENGINEERING",
                "B.S. ELECTRICAL ENGINEERING",
                "B.S. ELECTRONICS ENGINEERING",
                "B.S. INDUSTRIAL ENGINEERING",
                "B.S. MECHANICAL ENGINEERING",
            }},
            {"ETCYB", new HashSet<string>{
                "B.S. ACCOUNTANCY",
                "B.S. BUSINESS ADMINISTRATION",
                "B.S. TOURISM MANAGEMENT",
            }},
             {"CAS", new HashSet<string>{
                "B.A. COMMUNICATION",
                "B. MULTIMEDIA ARTS",
                "B.S. PSYCHOLOGY",
            }},
            {"CCIS", new HashSet<string>{
                "B.S. COMPUTER SCIENCE",
                "B.S. INFORMATION TECHNOLOGY",
            }},
            {"CMET", new HashSet<string>{
                "B.S. MARINE ENGINEERING",
                "B.S. MARINE TRANSPORTATION",
            }},
            {"SHS", new HashSet<string>{
                "STEM",
                "ABM",
                "HUMSS",
                "ICT",
            }},
    };

        public Student() : base(UserType)
        {
        }

        public string Department { get; set; }
        public string ProgramStrand { get; set; }
        public string YearGrade { get; set; }
    }

    public static class StudentExtensions
    {
        public static bool IsValid(this Student student, out string message)
        {
            message = "";
            var fields = new[] {
                student.FirstName,
                student.LastName,
                student.Password,
                student.Department,
                student.ProgramStrand,
                student.YearGrade
            };
            if (fields.Any(e => e == null || e == ""))
            {
                message = "There is an empty field";
                return false;
            }

            if (student.Department == "SHS")
            {
                if (!Student.ProgramStrands["SHS"].Contains(student.ProgramStrand))
                {
                    message = "Pick a valid strand";
                    return false;
                }
            }
            else
            {
                if (!Student.Departments.Contains(student.Department))
                {
                    message = "Pick a valid department";
                    return false;
                }
                if (!Student.ProgramStrands[student.Department].Contains(student.ProgramStrand))
                {
                    message = "Pick a valid program";

                    return false;
                }
            }

            return true;
        }
    }
}
