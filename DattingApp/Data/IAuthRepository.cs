using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DattingApp.Data
{
    public interface IAuthRepository
    {
         Task<User> Regisotr(User user,string password);
         Task<User> Login(string username,string password);
         Task<bool> UserExists(string username);
    }
}