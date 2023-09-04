using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Signal_ChatR_WebApi.Models
{
    public class Parties
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("FK_Parties_Room")]
        public int RoomId { get; set; }
        public Room? Room { get; set; }
        [Required]
        [ForeignKey("FK_Parties_User")]
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
