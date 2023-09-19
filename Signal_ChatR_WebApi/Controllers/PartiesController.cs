using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Signal_ChatR_WebApi.Models;

namespace Signal_ChatR_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartiesController : ControllerBase
    {
        private readonly Signal_ChatR_WebApiContext _context;

        public PartiesController(Signal_ChatR_WebApiContext context)
        {
            _context = context;
        }

        // GET: api/Parties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parties>>> GetParties()
        {
            if (_context.Parties == null)
            {
                return NotFound();
            }
            return await _context.Parties.ToListAsync();
        }

        // GET: api/Parties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Parties>> GetParties(int id)
        {
            if (_context.Parties == null)
            {
                return NotFound();
            }
            var parties = await _context.Parties.FindAsync(id);

            if (parties == null)
            {
                return NotFound();
            }

            return parties;
        }

        // PUT: api/Parties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParties(int id, Parties parties)
        {
            if (id != parties.Id)
            {
                return BadRequest();
            }

            _context.Entry(parties).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartiesExists(id))
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

        // POST: api/Parties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Parties>> PostParties(Parties parties)
        {
            if (_context.Parties == null)
            {
                return Problem("Entity set 'Signal_ChatR_WebApiContext.Parties'  is null.");
            }

            bool exist = await _context.Parties
                .AnyAsync(p => p.RoomId == parties.RoomId && p.UserId == parties.UserId);
            if (!exist)
            {
                _context.Parties.Add(parties);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetParties", new { id = parties.Id }, parties);
        }


        // DELETE: api/Parties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParties(int id)
        {
            if (_context.Parties == null)
            {
                return NotFound();
            }
            var parties = await _context.Parties.FindAsync(id);
            if (parties == null)
            {
                return NotFound();
            }

            _context.Parties.Remove(parties);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Parties/5/6
        [HttpDelete("{roomId}/{userId}")]
        public async Task<IActionResult> DeleteParty(int roomId, int userId)
        {
            if (_context.Parties == null)
            {
                return NotFound();
            }
            var parties = await _context.Parties.FirstAsync(p => p.RoomId == roomId && p.UserId == userId);
            if (parties == null)
            {
                return NotFound();
            }

            _context.Parties.Remove(parties);

            var room = await _context.Rooms.Include(r => r.Parties).FirstAsync(r => r.Id == roomId);
            if (room == null)
            {
                return NotFound();
            }

            if ((room.Parties.Count == 0 && room.IsPrivate == false) || room.IsPrivate == true)
                _context.Rooms.Remove(room);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PartiesExists(int id)
        {
            return (_context.Parties?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
