using System.ComponentModel.DataAnnotations;

namespace DattingApp.Dtos
{
    public class UserForRegistorDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="Password must be between 4 to 8 charactors.")]
        public string Password { get; set; }
    }
}