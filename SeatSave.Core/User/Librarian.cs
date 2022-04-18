using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{
    public class Librarian : UserModel
    {
        public static string UserType = "Librarian";

        public Librarian() : base(UserType)
        {
        }
    }
}
