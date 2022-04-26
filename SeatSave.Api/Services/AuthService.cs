using Microsoft.IdentityModel.Tokens;
using SeatSave.Core.User;
using SeatSave.EF;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SeatSave.Api.Services
{
    public class AuthService
    {
        private readonly SeatSaveContext dbContext;
        private readonly JwtInfo jwtInfo;

        public AuthService(SeatSaveContext dbContext, JwtInfo jwtInfo)
        {
            this.dbContext = dbContext;
            this.jwtInfo = jwtInfo;
        }

        public string GenerateToken(UserModel user)
        {
            
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtInfo.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("Email", user.Email),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim("UserGroup", user.UserGroup),
                new Claim("UserType", user.UserType)
            };

            var token = new JwtSecurityToken(jwtInfo.Issuer,
                                             jwtInfo.Audience,
                                             claims,
                                             expires: DateTime.Now.AddMinutes(30),
                                             signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public UserModel? Authenticate(string email, string password, string userGroup)
        {
            using (dbContext)
            {
                var currentUser = dbContext.Users.FirstOrDefault(e => e.Email.ToLower() == email.ToLower() && e.Password == password && e.UserGroup == userGroup);
                if (currentUser != null)
                {
                    return currentUser;
                }
            }
            return null;
        }

        public UserModel CreateUserModelFromClaims(IEnumerable<Claim> userClaims)
        {
            return new UserModel()
            {
                Email = userClaims.FirstOrDefault(e => e.Type == "Email")?.Value,
                FirstName = userClaims.FirstOrDefault(e => e.Type == "FirstName")?.Value,
                LastName = userClaims.FirstOrDefault(e => e.Type == "LastName")?.Value,
                UserGroup = userClaims.FirstOrDefault(e => e.Type == "UserGroup")?.Value,
                UserType = userClaims.FirstOrDefault(e => e.Type == "UserType")?.Value
            };
        }
    }

    public struct JwtInfo {
        public string Issuer;
        public string Audience;
        public string Key;
    }
}
