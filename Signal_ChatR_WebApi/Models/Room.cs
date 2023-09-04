using System.ComponentModel.DataAnnotations;

namespace Signal_ChatR_WebApi.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string? Name { get; set; }
        [Required]
        public bool IsPrivate { get; set; }

        public ICollection<Parties>? Parties { get; set; }
    }
}
