using System.ComponentModel.DataAnnotations;

namespace Signal_ChatR_WebApi.Models
{
    public class Parties
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
