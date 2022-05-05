namespace SeatSave.Core.User
{
    public class HeadLibrarian : Librarian
    {
        public new const string UserType = "HeadLibrarian";

        public HeadLibrarian() : base(UserType)
        {
        }
    }
}
