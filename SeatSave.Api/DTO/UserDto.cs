using SeatSave.Core.User;

namespace SeatSave.Api.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; set; }
        public string Password { get; set; }
        public string? Program { get; set; }
        public int? Year { get; set; }
        public string? Office { get; set; }
        public string? Department { get; set; }

        public Librarian ToLibrarian() => new Librarian()
        {
            Email = Email,
            FirstName = FirstName,
            Id = Id,
            LastName = LastName,
            Password = Password
        };

        public Student ToStudent() => new Student()
        {
            Email = Email,
            FirstName = FirstName,
            Id = Id,
            LastName = LastName,
            Password = Password,
            Program = Program,
            Year = (int)Year
        };

        public Staff ToStaff() => new Staff()
        {
            Email = Email,
            FirstName = FirstName,
            Id = Id,
            LastName = LastName,
            Password = Password,
            Office = Office
        };

        public Faculty ToFaculty() => new Faculty()
        {
            Email = Email,
            FirstName = FirstName,
            Id = Id,
            LastName = LastName,
            Password = Password,
            Department = Department
        };
    }
}
