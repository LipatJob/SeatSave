namespace SeatSave.Core.User
{
    public class Faculty : Visitor
    {
        public const string UserType = "Faculty";

        public static IEnumerable<string> FacultyOffices = new HashSet<string>
        {
            "College of Arts and Science (CAS)",
            "College of Computer and Information Science (CCIS)",
            "E.T. Yuchengco College of Business (ETYCB)",
            "Institute for Excellence in Continuing Education and Lifelong Learning (I-ExCELL)",
            "Mapúa Institute of Technology at Laguna (MITL)",
            "Mapúa-PTC College of Maritime Education and Training (Mapúa-PTC CMET)",
            "MCL Senior High School (MCL-SHS)",
        };

        public Faculty() : base(UserType)
        {
        }

        public string FacultyOffice { get; set; }
    }

    public static class FacultyExtensions
    {
        public static bool IsValid(this Faculty faculty)
        {
            var fields = new[] {
                faculty.FirstName,
                faculty.LastName,
                faculty.Password,
                faculty.FacultyOffice,
            };
            if (fields.Any(e => e == null || e == "")) { return false; }

            return Faculty.FacultyOffices.Contains(faculty.FacultyOffice);
        }
    }
}