using System.Runtime.Serialization;

namespace SeatSave.Core.User
{

    public class UserModel
    {
        public UserModel(string userType, string userGroup)
        {
            this.UserType = userType;
            this.UserGroup = userGroup;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserType { get; set; }
        public string UserGroup { get; set; }
        public string Password { get; set; }
    }
}
