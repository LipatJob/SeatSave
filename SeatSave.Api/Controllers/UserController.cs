using Microsoft.AspNetCore.Mvc;
using SeatSave.Api.DTO;
using SeatSave.Api.Services;
using SeatSave.Core.User;
using SeatSave.EF;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private SeatSaveContext dbContext;

        public UserController(SeatSaveContext context)
        {
            this.dbContext = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = dbContext.Users.ToList().Select(object (e) =>
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
            var user = dbContext.Users.Find(id);
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
            var user = userDto.ToUserType();
            if (user == null) { return BadRequest("Invalid user type"); }

            RegistrationService registrationService = new RegistrationService(dbContext.Users);
            var canRegister = registrationService.CanUserRegister(user, out var message);
            if (!canRegister) { return BadRequest(message); }

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return Ok(user);
        }

        [HttpGet("Existing")]
        public IActionResult DoesEmailExist([FromQuery] string email)
        {
            var user = dbContext.Users.FirstOrDefault(e => e.Email == email);
            if (user == null) { return Ok(false); }
            return Ok(true);
        }



        [HttpPut("{id}")]
        public IActionResult Update([FromBody] UserDto userDto, int id)
        {
            if (userDto.Id != id) { return BadRequest(); }

            var user = userDto.ToUserType();
            if (user == null) { return BadRequest(); }

            dbContext.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(user);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = dbContext.Users.Find(id);
            if (user == null) { NotFound(); }

            dbContext.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            dbContext.SaveChanges();

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
