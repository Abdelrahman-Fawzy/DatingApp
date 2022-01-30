using DatingApp.Entities;

namespace DatingApp.Interfaces
{
    public interface ITokenInterface
    {
        string createToken(AppUser user);
    }
}
