namespace SeatSave.Core.User
{
    public class Librarian : UserModel
    {
        public new const string UserType = "Librarian";
        public new const string UserGroup = "Librarian";


        public Librarian() : base(UserType, UserGroup)
        {
        }

        protected Librarian(string UserType) : base(UserType, UserGroup)
        {
        }
    }
}
