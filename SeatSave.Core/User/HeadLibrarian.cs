using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{
    public class HeadLibrarian: Librarian
    {
        public static string UserType = "HeadLibrarian";

        public HeadLibrarian() : base(UserType)
        {
        }
    }
}
