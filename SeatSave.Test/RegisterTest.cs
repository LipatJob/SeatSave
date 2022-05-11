using Microsoft.EntityFrameworkCore;
using SeatSave.Api.Services;
using SeatSave.Core.User;
using SeatSave.EF;
using System;
using Xunit;

/*
Refactoring Ideas (for the future):
- Move email validation to user class
- Make use of inheritiance for validation so that entities could be polymorpically validated
 */
namespace SeatSave.Test
{
    public class RegisterTest : IClassFixture<UserRegisterSeedFixture>
    {
        UserRegisterSeedFixture _fixture;

        RegistrationService registrationService;

        public RegisterTest(UserRegisterSeedFixture fixture)
        {
            _fixture = fixture;
            registrationService = new RegistrationService(fixture.Context.Users);
        }

        [Fact]
        public void CanRegisterStudentSuccessfully()
        {
            var user = new Student
            {
                Id = 2,
                Email = "student@live.mcl.edu.ph",
                FirstName = "Student",
                LastName = "Account",
                Password = "student_password",
                Department = "CCIS",
                ProgramStrand = "B.S. COMPUTER SCIENCE",
                YearGrade = "First Year",
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.True(canRegister);
        }

        [Fact]
        public void CanRegisterFacultySuccessfully()
        {
            var user = new Faculty
            {
                Id = 4,
                Email = "faculty@mcl.edu.ph",
                FirstName = "Faculty",
                LastName = "Account",
                Password = "faculty_password",
                FacultyOffice = "MCL Senior High School (MCL-SHS)"
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.True(canRegister);
        }

        [Fact]
        public void CanRegisterStaffSuccessfully()
        {
            var user = new Staff
            {
                Id = 5,
                Email = "staff@mcl.edu.ph",
                FirstName = "Staff",
                LastName = "Account",
                Password = "staff_password",
                StaffOffice = "Purchasing Office"
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.True(canRegister);
        }

        [Fact]
        public void CannotRegisterStudentWithMissingFields()
        {
            var user = new Student();

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterFacultyWithMissingFields()
        {
            var user = new Faculty();

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterStaffWithMissingFields()
        {
            var user = new Staff();

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterUsedEmail()
        {
            var user = new Student
            {
                Id = 2,
                Email = "used_student@live.mcl.edu.ph",
                FirstName = "Student",
                LastName = "Account",
                Password = "student_password",
                Department = "CCIS",
                ProgramStrand = "B.S. COMPUTER SCIENCE",
                YearGrade = "First Year",
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterWithShortPassword()
        {
            var user = new Student
            {
                Id = 2,
                Email = "student@live.mcl.edu.ph",
                FirstName = "Student",
                LastName = "Account",
                Password = "s",
                Department = "CCIS",
                ProgramStrand = "B.S. COMPUTER SCIENCE",
                YearGrade = "First Year",
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterStudentWithInvalidInformation()
        {
            var user = new Student
            {
                Id = 2,
                Email = "student@live.mcl.edu.ph",
                FirstName = "Student",
                LastName = "Account",
                Password = "student_password",
                Department = "ETYCB",
                ProgramStrand = "B.S. COMPUTER SCIENCE",
                YearGrade = "Grade 11",
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterFacultyWithInvalidInformation()
        {
            var user = new Faculty
            {
                Id = 4,
                Email = "faculty@mcl.edu.ph",
                FirstName = "Faculty",
                LastName = "Account",
                Password = "faculty_password",
                FacultyOffice = "Purchasing Office"
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }

        [Fact]
        public void CannotRegisterStaffWithInvalidInformation()
        {
            var user = new Staff
            {
                Id = 5,
                Email = "staff@mcl.edu.ph",
                FirstName = "Staff",
                LastName = "Account",
                Password = "staff_password",
                StaffOffice = "Invalid Staff Office"
            };

            var canRegister = registrationService.CanUserRegister(user, out var _);

            Assert.False(canRegister);
        }
    }
}

public class UserRegisterSeedFixture : IDisposable
{
    public SeatSaveContext Context { get; private set; }

    public UserRegisterSeedFixture()
    {
        var options = new DbContextOptionsBuilder<SeatSaveContext>()
          .UseInMemoryDatabase(databaseName: "SeatSaveDb")
          .Options;

        using (var context = new SeatSaveContext(options))
        {
            context.Users.AddRange(new UserModel[] {
                    new Librarian
                    {
                        Email = "librarian@mcl.edu.ph",
                        FirstName = "Librarian",
                        LastName = "Account",
                        Password = "librarian_password"
                    },

                    new Student
                    {
                        Email = "used_student@live.mcl.edu.ph",
                        FirstName = "SHS Student",
                        LastName = "Account",
                        Password = "1234567",
                        ProgramStrand = "STEM",
                        Department = "SHS",
                        YearGrade = "Grade 11",
                    }
                });
            context.SaveChanges();
        }


        Context = new SeatSaveContext(options);
    }

    public void Dispose()
    {
        Context.Dispose();
    }
}
