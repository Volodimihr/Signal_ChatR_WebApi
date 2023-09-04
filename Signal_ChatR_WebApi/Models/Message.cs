using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Signal_ChatR_WebApi.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("FK_Msg_Room")]
        public int RoomId { get; set; }
        public Room? Room { get; set; }
        [Required]
        [ForeignKey("FK_Msg_User")]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required]
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
        public string? MsgText { get; set; }
        public string? MsgFilePath { get; set; }
        public string? MsgFileMime { get; set; }
    }
}
