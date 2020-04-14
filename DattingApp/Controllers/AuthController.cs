using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Models;
using DattingApp.Data;
using DattingApp.Dtos;
// using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DattingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;
        }

        [HttpPost]
        [Route("registor")]
        public async Task<IActionResult> Registor(UserForRegistorDto userForRegistorDto)
        {
            if (await _repo.UserExists(userForRegistorDto.Username))
            {
                return BadRequest("User name already exists.");
            }
            User createNewUser = new User();
            createNewUser.Username = userForRegistorDto.Username;
            var newUser = await _repo.Regisotr(createNewUser, userForRegistorDto.Password);
            return Ok(newUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userExists = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);
            if (userExists == null)
            {
                return Unauthorized();
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userExists.Id.ToString()),
                new Claim(ClaimTypes.Name,userExists.Username)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsettings:Token").Value));
            var cred = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDiscriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };
            var tokenHanhler = new JwtSecurityTokenHandler();
            var token = tokenHanhler.CreateToken(tokenDiscriptor);
            return Ok(new {
                token = tokenHanhler.WriteToken(token).ToString()
            });
        }
    }
}