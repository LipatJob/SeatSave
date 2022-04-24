using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SeatSave.Api.DTO;
using SeatSave.Core.User;
using SeatSave.EF;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly SeatSaveContext dbContext;

        public AuthenticationController(IConfiguration config, SeatSaveContext dbContext)
        {
            this.config = config;
            this.dbContext = dbContext;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }

            return NotFound("User not found");
        }

        [HttpGet("User")]
        public IActionResult GetUser([FromBody] UserLogin userLogin)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return Ok(new UserModel()
                {
                    Email = userClaims.FirstOrDefault(e => e.Type == "Email")?.Value,
                    FirstName = userClaims.FirstOrDefault(e => e.Type == "FirstName")?.Value,
                    LastName = userClaims.FirstOrDefault(e => e.Type == "LastName")?.Value,
                    UserGroup = userClaims.FirstOrDefault(e => e.Type == "UserGroup")?.Value,
                    UserType = userClaims.FirstOrDefault(e => e.Type == "UserType")?.Value
                });
            }

            return NotFound();
        }



        private string Generate(UserModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("Email", user.Email),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim("UserGroup", user.UserGroup),
                new Claim("UserType", user.UserType)
            };

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
                                             config["Jwt:Audience"],
                                             claims,
                                             expires: DateTime.Now.AddMinutes(30),
                                             signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel? Authenticate(UserLogin userLogin)
        {
            using (dbContext)
            {
                var currentUser = dbContext.Users.FirstOrDefault(e => e.Email.ToLower() == userLogin.Email.ToLower() && e.Password == userLogin.Password && e.UserGroup == userLogin.UserGroup);
                if (currentUser != null)
                {
                    return currentUser;
                }
            }
            return null;
        }
    }
}
