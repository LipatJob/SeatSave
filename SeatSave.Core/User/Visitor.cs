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
            throw new NotImplementedException("TODO");
        }
    }
}
