using System.Threading.Tasks;
using DatingApp.API.Models;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace DattingApp.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext db;
        public AuthRepository(DataContext db)
        {
            this.db = db;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await db.Users.FirstOrDefaultAsync(x=>x.Username==username);
            if(user==null)
                return null;
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt)){
                return null;
            }
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                passwordSalt = hmac.Key;
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computedHash.Length;i++){
                    if(computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<User> Regisotr(User user, string password)
        {
            byte[] passwordSalt,passwordHash;
            CreatePasswordHash(password,out passwordSalt,out passwordHash);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
            return user;
        }

        public void CreatePasswordHash(string password,out byte[] passwordSalt,out byte[] passwordHash)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await db.Users.AnyAsync(x=>x.Username==username))
                return true;
            return false;
        }
    }
}