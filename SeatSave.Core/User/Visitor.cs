using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Core.User
{
    public class Visitor : UserModel
    {
        public Visitor(string UserType) : base(UserType)
        {
        }

        public void Borrow()
        {
            // TODO: Logic for borrowing
        }
    }
}
