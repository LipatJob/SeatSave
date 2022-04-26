using Microsoft.EntityFrameworkCore;
using SeatSave.Core.User;
using SeatSave.EF;
using System;
using Xunit;

namespace SeatSave.Test
{
    public class RegisterTest : IClassFixture<UserLoginSeedFixture>
    {
        UserRegisterSeedFixture _fixture;

        public RegisterTest(UserRegisterSeedFixture fixture)
        {
            _fixture = fixture;
        }


        [Fact]
        public void CanRegisterStudentSuccessfully()
        {

        }

        [Fact]
        public void CanRegisterFacultySuccessfully()
        {

        }

        [Fact]
        public void CanRegisterStaffSuccessfully()
        {

        }

        [Fact]
        public void CannotRegisterStudentWithMissingFields()
        {

        }

        [Fact]
        public void CannotRegisterFacultyWithMissingFields()
        {

        }

        [Fact]
        public void CannotRegisterStaffWithMissingFields()
        {

        }

        [Fact]
        public void CannotRegisterUsedEmail()
        {

        }

        [Fact]
        public void CannotRegisterWithShortPassword()
        {

        }

        [Fact]
        public void CannotRegisterStudentWithInvalidInformation()
        {

        }

        [Fact]
        public void CannotRegisterFacultyWithInvalidInformation()
        {

        }

        [Fact]
        public void CannotRegisterStaffWithInvalidInformation()
        {

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
                        Id = 1,
                        Email = "librarian@gmail.com",
                        FirstName = "Librarian",
                        LastName = "Account",
                        Password = "librarian_password"
                    },
                    new Student
                    {
                        Id = 2,
                        Email = "student@gmail.com",
                        FirstName = "Student",
                        LastName = "Account",
                        Password = "student_password",
                        ProgramStrand = "B.S. COMPUTER SCIENCE",
                        YearGrade = "First Year",
                    },
                    new Faculty
                    {
                        Id = 3,
                        Email = "faculty@gmail.com",
                        FirstName = "Faculty",
                        LastName = "Account",
                        Password = "faculty_password",
                        FacultyOffice = "MCL Senior High School (MCL-SHS)"
                    },
                    new Staff
                    {
                        Id = 4,
                        Email = "staff@gmail.com",
                        FirstName = "Staff",
                        LastName = "Account",
                        Password = "staff_password",
                        StaffOffice = "Purchasing Office"
                    },
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
