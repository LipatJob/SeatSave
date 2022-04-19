namespace SeatSave.Core.User
{
    public class Librarian : UserModel
    {
        public const string UserType = "Librarian";

        public Librarian() : base(UserType)
        {
        }

        protected Librarian(string UserType) : base(UserType)
        {
        }
    }
}
