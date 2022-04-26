using Microsoft.AspNetCore.Mvc;
using SeatSave.Api.DTO;
using SeatSave.Core.User;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private SeatSaveContext context;

        public UserController(SeatSaveContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = context.Users.ToList().Select(object (e) =>
            {
                e.Password = "";
                var userModel = e.UserType switch
                {
                    Librarian.UserType => (Librarian)e,
                    Student.UserType => (Student)e,
                    Staff.UserType => (Staff)e,
                    Faculty.UserType => (Faculty)e,
                    _ => e,
                };
                return userModel;
            });

            return Ok(users);
        }
        [HttpGet("{id}")]
        public IActionResult GetSpecific([FromRoute] int id)
        {
            var user = context.Users.Find(id);
            if (user == null) { return NotFound(); }
            user.Password = "";

            var userType = user.UserType switch
            {
                Librarian.UserType => (Librarian)user,
                Student.UserType => (Student)user,
                Staff.UserType => (Staff)user,
                Faculty.UserType => (Faculty)user,
                _ => user,
            };
            return Ok(userType);
        }

        [HttpPost]
        public IActionResult Add([FromBody] UserDto userDto)
        {
            var user = DtoToUserType(userDto);
            if (user == null) { return BadRequest(); }

            context.Users.Add(user);
            context.SaveChanges();

            return Ok(user);
        }

        [HttpHead]
        public IActionResult DoesEmailExist([FromQuery] string email)
        {
            var user = context.Users.FirstOrDefault(e => e.Email == email);
            if (user == null) { return NotFound(); }
            return NoContent();
        }

        private static UserModel? DtoToUserType(UserDto userDto)
        {
            return userDto.UserType switch
            {
                Librarian.UserType => userDto.ToLibrarian(),
                Student.UserType => userDto.ToStudent(),
                Faculty.UserType => userDto.ToFaculty(),
                _ => null,
            };
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] UserDto userDto, int id)
        {
            if (userDto.Id != id) { return BadRequest(); }

            var user = DtoToUserType(userDto);

            if (user == null) { return BadRequest(); }


            context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();

            return Ok(user);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = context.Users.Find(id);
            if (user == null) { NotFound(); }

            context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            context.SaveChanges();

            return NoContent();
        }

        [HttpGet("Enum/Current")]
        public IActionResult GetCurrent() { throw new NotImplementedException("TODO"); }

        [HttpGet("Enum/Student/Department")]
        public IActionResult GetDepartments()
        {
            return Ok(Student.Departments);
        }

        [HttpGet("Enum/Student/Program/{department}")]
        public IActionResult GetPrograms(string department)
        {
            if (!Student.ProgramStrands.ContainsKey(department))
            {
                return NotFound();
            }
            return Ok(Student.ProgramStrands[department]);
        }

        [HttpGet("Enum/Student/Program")]
        public IActionResult GetPrograms()
        {
            return Ok(Student.ProgramStrands);
        }

        [HttpGet("Enum/Staff/Office")]
        public IActionResult GetStaffOffices()
        {
            return Ok(Staff.StaffOffices);
        }

        [HttpGet("Enum/Faculty/Office")]
        public IActionResult GetFacultyOffices()
        {
            return Ok(Faculty.FacultyOffices);
        }
    }

}
