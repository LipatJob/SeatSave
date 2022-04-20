namespace SeatSave.Core.User
{
    public class Visitor : UserModel
    {
        public new const string UserGroup = "Visitor";
        public Visitor(string UserType) : base(UserType, UserGroup)
        {
        }

        public void Borrow()
        {
            // TODO: Logic for borrowing
            throw new NotImplementedException("TODO");
        }
    }
}
