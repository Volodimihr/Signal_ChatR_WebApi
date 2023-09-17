﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signal_ChatR_WebApi.Models;

namespace Signal_ChatR_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Signal_ChatR_WebApiContext _context;

        public UsersController(Signal_ChatR_WebApiContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDTO userData)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userData.Email && u.Password == userData.Password);

            if (user == null)
            {
                return BadRequest();
            }

            HttpContext.Session.SetInt32("UserId", user.Id);

            return Ok(user.Id);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.Include(u => u.Parties).ThenInclude(p => p.Room).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (user.AvatarPath != null)
            {
                user.AvatarPath = "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(user.AvatarPath));
            }

            return user;
        }
        
        // GET: api/Users/data/5
        [HttpGet("data/{id}")]
        public async Task<ActionResult<User>> GetAvatarById(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (user.AvatarPath != null)
            {
                user.AvatarPath = "data:image/png;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(user.AvatarPath));
            }

            user.Password = "";

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'Signal_ChatR_WebApiContext.Users'  is null.");
            }

            if (user.AvatarPath != null)
            {
                byte[] imageBytes = Convert.FromBase64String(user.AvatarPath.Split(',').Last());
                string avatarPath = $"Avatars/{user.Email}.png";
                System.IO.File.WriteAllBytes(avatarPath, imageBytes);
                user.AvatarPath = avatarPath;
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
