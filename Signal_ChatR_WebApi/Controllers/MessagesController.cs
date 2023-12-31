﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Signal_ChatR_WebApi.Models;

namespace Signal_ChatR_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly Signal_ChatR_WebApiContext _context;

        public MessagesController(Signal_ChatR_WebApiContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            return await _context.Messages.ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // GET: api/Messages/5
        // Get messages for active room
        [HttpGet("roomId/{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesByRoomId(int id)
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            var messages = await _context.Messages.Where(m => m.RoomId == id).ToListAsync();

            if (messages == null)
            {
                return NotFound();
            }

            foreach (Message message in messages)
            {
                if (!message.MsgFilePath.IsNullOrEmpty())
                {
                    message.MsgFilePath = Convert.ToBase64String(System.IO.File.ReadAllBytes(message.MsgFilePath))+Path.GetExtension(message.MsgFilePath);
                }
            }

            return messages;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
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

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            if (_context.Messages == null)
            {
                return Problem("Entity set 'Signal_ChatR_WebApiContext.Messages'  is null.");
            }

            // store file data if file was atached to message
            if (!message.MsgFilePath.IsNullOrEmpty())
            {
                byte[] fileBytes = Convert.FromBase64String(message.MsgFilePath.Split(',').Last());
                string ext = Path.GetExtension(message.MsgFilePath.Split(',').First());
                string filePath = Path.Combine("Storage", $"sig_{DateTime.UtcNow.ToString("yyyyMMdd_HHmmss")}{ext}");
                System.IO.File.WriteAllBytes(filePath, fileBytes);
                message.MsgFilePath = filePath;
            }

            message.SentAt = DateTime.UtcNow;

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            if (_context.Messages == null)
            {
                return NotFound();
            }
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(int id)
        {
            return (_context.Messages?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
