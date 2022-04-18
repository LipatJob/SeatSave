using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{
    public class Staff : UserModel
    {
        public static string UserType = "Staff";

        public Staff() : base(UserType)
        {
        }

        public string Office { get; set; }
    }
}
