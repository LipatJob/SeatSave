﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeatSave.Api.DTO;
using SeatSave.Api.Services;
using SeatSave.EF;
using System.Security.Claims;

namespace SeatSave.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthService authService;

        public AuthenticationController(IConfiguration config, SeatSaveContext dbContext)
        {
            authService = new AuthService(dbContext, new JwtInfo
            {
                Key = config["Jwt:Key"],
                Issuer = config["Jwt:Issuer"],
                Audience = config["Jwt:Audience"],
            });
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            if (authService.TryAuthenticate(userLogin.Email, userLogin.Password, userLogin.UserGroup, out var user))
            {
                var token = authService.GenerateToken(user);
                return Ok(token);
            }

            return NotFound("User not found");
        }

        [HttpGet("User")]
        public IActionResult GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return Ok(AuthService.CreateUserModelFromClaims(userClaims));
            }

            return NotFound();
        }










    }
}
