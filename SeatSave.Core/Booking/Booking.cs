using SeatSave.Core.Schedule;
using SeatSave.Core.Seat;
using SeatSave.Core.User;

namespace SeatSave.Core.Booking
{
    public class BookingModel
    {
        public const string PendingStatus = "Pending";
        public const string CheckedInStatus = "Checked In";
        public const string CheckedOutStatus = "Checked Out";
        public const string CancelledStatus = "Cancelled";

        public int Id { get; set; }
        public string? BookingCode { get; set; }
        public DateOnly BookingDate { get; set; }
        public int PeriodId { get; set; }
        public virtual Period? Period { get; set; }
        public int SeatId { get; set; }
        public virtual SeatModel? Seat { get; set; }
        public string? Status { get; set; }
        public int StatusHistoryId { get; set; }
        public virtual StatusHistory? StatusHistory { get; set; }
        public int UserModelId { get; set; }
        public virtual UserModel? UserModel { get; set; }

        public void Cancel() { throw new NotImplementedException("TODO"); }
        public void CheckIn() { throw new NotImplementedException("TODO"); }
        public void CheckOut() { throw new NotImplementedException("TODO"); }

    }
}
