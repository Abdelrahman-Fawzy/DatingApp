using AutoMapper;
using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DatingApp.Controllers
{
    [Authorize]
    public class UsersController : BaseAPIController
    {
        private readonly IUserRepository _users;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository usersRepository, IMapper mapper)
        {
            _users = usersRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _users.GetUsersAsync();

            var UsersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(UsersToReturn);
        }

        [HttpGet("userById/{id}")]
        public async Task<ActionResult<MemberDto>> GetUserById(int id)
        {
            var user = await _users.GetUserByIdAsync(id);
            return _mapper.Map<MemberDto>(user);
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string userName)
        {
            var user = await _users.GetUserByUserNameAsync(userName);
            return _mapper.Map<MemberDto>(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(updateMemberDTO member)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _users.GetUserByUserNameAsync(username);

            _mapper.Map(member, user);

            _users.Update(user);

            if (await _users.SaveChangesAsync()) return NoContent();

            return BadRequest("Failed To Update");
        }
    }
}
