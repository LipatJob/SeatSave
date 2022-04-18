using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{

    public class UserModel
    {
        public UserModel(string userType)
        {
            this.UserType = userType;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; protected set; }
        public string Password { get; set; }
    }
}
