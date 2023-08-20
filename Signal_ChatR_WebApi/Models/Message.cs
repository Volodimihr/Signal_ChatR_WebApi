using System.ComponentModel.DataAnnotations;

namespace Signal_ChatR_WebApi.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public int UserId { get; set; }
        public string? MsgText { get; set; }
        public string? MsgFilePath { get; set;}
        public string? MsgFileMime { get; set; }
    }
}
