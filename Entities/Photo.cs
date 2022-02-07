using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int ID { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser Users { get; set; }
        public int AppUserId { get; set; }
    }
}