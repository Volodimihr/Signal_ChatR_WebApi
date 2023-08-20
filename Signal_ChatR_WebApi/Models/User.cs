﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Signal_ChatR_WebApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(50)]
        [PasswordPropertyText(true)]
        public string Password { get; set; }
        public string AvatarPath { get; set; }
    }
}
