using DatingApp.Data;
using DatingApp.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly DataContext context;

        public BuggyController(DataContext _context)
        {
            context = _context;
        }

        [Authorize]
        [HttpGet("Auth")]
        public ActionResult<string> GetSecretKey()
        {
            return "Secret Key";
        }

        [HttpGet("Not-Found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var user = context.Users.Find(-1);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet("Server-Error")]
        public ActionResult<string> GetServerError()
        {
            string? user = context.Users.Find(-1).ToString();

            return user;
        }

        [HttpGet("Bad-Request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This Is Not A Good Request");
        }
    }
}
