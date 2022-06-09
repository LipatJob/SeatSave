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
        public int VisitorId { get; set; }
        public virtual Visitor? VisitorModel { get; set; }

        public void Cancel(DateTime currentDateTime)
        {
            if (this.Status != PendingStatus) { throw new InvalidOperationException(); }
            StatusHistory.DateTimeCanceled = currentDateTime;
            this.Status = CancelledStatus;
        }

        public void CheckIn(DateTime currentDateTime)
        {
            if (this.Status != PendingStatus) { throw new InvalidOperationException(); }
            // if (currentDateTime < GetBookingTimeStart()) { throw new InvalidOperationException(); } // disabled for demonstration
            StatusHistory.DateTimeCheckedIn = currentDateTime;
            this.Status = CheckedInStatus;
        }

        public void CheckOut(DateTime currentDateTime)
        {
            if (this.Status != CheckedInStatus) { throw new InvalidOperationException(); }
            // if (currentDateTime < GetBookingTimeStart()) { throw new InvalidOperationException(); } // disabled for demonstration
            StatusHistory.DateTimeCheckedOut = currentDateTime;
            this.Status = CheckedOutStatus;
        }

        private DateTime GetBookingTimeStart()
        {
            // previous - return BookingDate.ToDateTime(TimeOnly.FromTimeSpan(Period.TimeStart));
            return BookingDate.ToDateTime(Period.TimeStart);
        }

    }
}
