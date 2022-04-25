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

        public static Dictionary<string, HashSet<string>> StudentValues = new Dictionary<string, HashSet<string>>{
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

        public string ProgramStrand { get; set; }
        public string YearGrade { get; set; }
    }
}
