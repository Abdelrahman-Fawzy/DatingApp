using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string userName { get; set; }
        [Required]
        public string password { get; set; }
    }
}
