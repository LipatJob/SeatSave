using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{

    public class Student : UserModel
    {
        public static string UserType = "Student";

        public Student() : base(UserType)
        {
        }

        public string Program { get; set; }
        public int Year { get; set; }
    }
}
