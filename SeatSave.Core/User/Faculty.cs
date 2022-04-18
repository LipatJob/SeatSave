using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{
    public class Faculty : UserModel
    {
        public static string UserType = "Faculty";
        public Faculty() : base(UserType)
        {
        }

        public string Department { get; set; }
    }
}