namespace DatingApp.Entities
{
    public class AppUser
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
    }
}
