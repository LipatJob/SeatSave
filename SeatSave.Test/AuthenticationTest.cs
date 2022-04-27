using Microsoft.EntityFrameworkCore;
using SeatSave.Api.Services;
using SeatSave.Core.User;
using SeatSave.EF;
using System;
using Xunit;

namespace SeatSave.Test
{
    public class AuthenticationTest : IClassFixture<UserLoginSeedFixture>
    {
        UserLoginSeedFixture _fixture;

        public AuthenticationTest(UserLoginSeedFixture fixture)
        {
            _fixture = fixture;
        }

        private AuthService CreateAuthService()
        {
            return new AuthService(_fixture.Context, new JwtInfo());
        }

        [Fact]
        public void LoginWithValidCredentialsSucceeds()
        {
            var email = "student@gmail.com";
            var password = "student_password";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.True(success);
        }

        [Fact]
        public void StudentCanLogin()
        {
            var email = "student@gmail.com";
            var password = "student_password";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.True(success);
        }

        [Fact]
        public void LibrarianCanLogin()
        {
            var email = "librarian@gmail.com";
            var password = "librarian_password";
            var userGroup = Librarian.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.True(success);
        }

        [Fact]
        public void FacultyCanLogin()
        {
            var email = "faculty@gmail.com";
            var password = "faculty_password";
            var userGroup = Faculty.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.True(success);
        }

        [Fact]
        public void StaffCanLogin()
        {
            var email = "staff@gmail.com";
            var password = "staff_password";
            var userGroup = Staff.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.True(success);
        }

        [Fact]
        public void LoginWithUnregisteredEmailFails()
        {
            var email = "not_registered@gmail.com";
            var password = "student_password";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.False(success);
        }

        [Fact]
        public void LoginWithIncorrectPasswordFails()
        {
            var email = "student@gmail.com";
            var password = "wrong_password";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.False(success);
        }

        [Fact]
        public void LoginWithMissingPasswordFails()
        {
            var email = "student@gmail.com";
            var password = "";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.False(success);
        }

        [Fact]
        public void LoginWithMissingEmailFails()
        {
            var email = "";
            var password = "wrong_password";
            var userGroup = Visitor.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.False(success);
        }

        [Fact]
        public void VisitorLoginAsLibrarianFails()
        {
            var email = "student@gmail.com";
            var password = "student_password";
            var userGroup = Librarian.UserGroup;
            var service = CreateAuthService();

            var success = service.TryAuthenticate(email, password, userGroup, out var _);

            Assert.False(success);
        }
    }
}

public class UserLoginSeedFixture : IDisposable
{
    public SeatSaveContext Context { get; private set; }

    public UserLoginSeedFixture()
    {
        var options = new DbContextOptionsBuilder<SeatSaveContext>()
          .UseLazyLoadingProxies()
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
