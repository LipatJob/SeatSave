namespace SeatSave.Core.User
{
    public class Visitor : UserModel
    {
        public new const string UserGroup = "Visitor";
        public Visitor(string UserType) : base(UserType, UserGroup)
        {
        }

        public void Book() // (date, period, seat)
        {
            // BEFORE CREATING OBJECT:
            // Check if User can book (CanBook())
            // 1. Create Booking Object out of the paramters
            // 2. Add booking object to visitor book history (List)
            throw new NotImplementedException("TODO");
        }

        public bool CanBook()
        {
            BookablePolicy obj = new BookablePolicy();
            return obj.IsSatisfied(); // (date, period, seat)
            // User can book if:
            // 1. No pending booking
            // 2. if the date, period and seat is bookable
            throw new NotImplementedException("TODO");
        }
    }
}
