using DatingApp.Entities;
using DatingApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        async Task<AppUser> IUserRepository.GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.ID == id);
        }

        async Task<AppUser> IUserRepository.GetUserByUserNameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        async Task<IEnumerable<AppUser>> IUserRepository.GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        async Task<bool> IUserRepository.SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        void IUserRepository.Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
