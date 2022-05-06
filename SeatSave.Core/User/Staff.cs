namespace SeatSave.Core.User
{
    public class Staff : Visitor
    {
        public const string UserType = "Staff";
        public static IEnumerable<string> StaffOffices = new HashSet<string>{
            "Office of the President",
            "Office of the Executive Vice President",
            "Office of the Vice President for Academic Affairs",
            "Office of the Vice President for Finance/Chief Finance Officer",
            "Office of the SVP for Operations and Legal",
            "Office of the AVP for Human Resources and Administrative Services",
            "Office of the AVP for Finance/Controller",
            "Office of the AVP for Treasury/Treasury Manager",
            "College of Arts and Science (CAS)",
            "College of Computer and Information Science (CCIS)",
            "E.T. Yuchengco College of Business (ETYCB)",
            "Institute for Excellence in Continuing Education and Lifelong Learning (I-ExCELL)",
            "Mapúa Institute of Technology at Laguna (MITL)",
            "Mapúa-PTC College of Maritime Education and Training (Mapúa-PTC CMET)",
            "MCL Senior High School (MCL-SHS)",
            "Accounting Office",
            "Admissions Office",
            "Athletics and Physical Education Office",
            "Blue and Silver Bookshop",
            "Campus Development and Maintenance Office",
            "Center for Guidance and Counseling",
            "Center for Health Services and Wellness",
            "Center for Learning and Information Resources",
            "Center for Service-Learning and Community Engagement",
            "Human Resources Management Office",
            "Information Technology Services Office (formerly Office for Information Technology Services)",
            "Instructional Facilities Office (formerly Laboratory Management Office)",
            "Learning Environments and Innovations Office (formerly Learning Environments and Innovations)",
            "Office for Corporate Communications (formerly Corporate Communications Office)",
            "Office for Quality Management (formerly Quality Management Office)",
            "Office for Risk Management and Business Continuity (formerly Risk Management and Business Continuity Office)",
            "Office for Strategic Partnerships and Global Engagement (formerly Office for External Programs)",
            "Purchasing Office",
            "Registrar’s Office (formerly Office of the College Registrar)",
            "Research Promotion and Coordination Office (formerly Office for Research Promotion and Coordination)",
            "Security Office",
            "Student Affairs Office (formerly Office for Student Services)",
            "Treasury Office"
        };

        public Staff() : base(UserType)
        {
        }

        public string StaffOffice { get; set; }
    }


    public static class StaffExtensions
    {
        public static bool IsValid(this Staff staff)
        {
            var fields = new[] {
                staff.FirstName,
                staff.LastName,
                staff.Password,
                staff.StaffOffice,
            };
            if (fields.Any(e => e == null || e == "")) { return false; }

            return Staff.StaffOffices.Contains(staff.StaffOffice);
        }
    }
}
