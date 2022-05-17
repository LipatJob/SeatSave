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
                "AR",
                "CHE",
                "CE",
                "COE",
                "EE",
                "ECE",
                "IE",
                "ME",
            }},
            {"ETCYB", new HashSet<string>{
                "ACT",
                "BA",
                "TM",
            }},
             {"CAS", new HashSet<string>{
                "COMM",
                "BMMA",
                "PSY",
            }},
            {"CCIS", new HashSet<string>{
                "CS",
                "IT",
            }},
            {"CMET", new HashSet<string>{
                "MARE",
                "MT",
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
