using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //[Authorize]
    public class UsersController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        //   [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await _userRepository.GetUsersAsync();
           // var userToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
           // return Ok(userToReturn);
           var users = await _userRepository.GetMembersAsync();
           return Ok(users) ;
        }

        //   [Authorize]
        //[HttpGet("{id}")]
        //public async Task<ActionResult<MemberDto>> GetUserById(int id)
        //{
        //    var user = await _userRepository.GetUserByIdAsync(id);
        //    var userToReturn = _mapper.Map<MemberDto>(user);

        //    return Ok(userToReturn);
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            // var user = await _userRepository.GetUserByUsernameAsync(username);
            // var userToReturn = _mapper.Map<MemberDto>(user);
            // return Ok(userToReturn);

            return  await _userRepository.GetMemberAsync(username);        }
    }
}