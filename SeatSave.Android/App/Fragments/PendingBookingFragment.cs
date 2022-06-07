using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Util;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SeatSave.Android.App.Services;
using SeatSave.Android.App.Models;


namespace SeatSave.Android.App.Fragments
{
    public class PendingBookingFragment : AndroidX.Fragment.App.Fragment
    {
        TextView bookingTime, bookingCode, bookingDate, bookingCompleteTime, bookingSeat;
        Button buttonCancel;

        Booking bookingDetail;
        BookingService service;
        
        public void SetDetail(Booking booking)
        {
            bookingDetail = booking;
        }

        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            var view =  inflater.Inflate(Resource.Layout.pending_booking, container, false);
            service = new BookingService();
            bookingTime = view.FindViewById<TextView>(Resource.Id.bookingTime);
            bookingCode = view.FindViewById<TextView>(Resource.Id.bookingCode);
            bookingDate = view.FindViewById<TextView>(Resource.Id.bookingDate);
            bookingCompleteTime = view.FindViewById<TextView>(Resource.Id.bookingCompleteTime);
            bookingSeat = view.FindViewById<TextView>(Resource.Id.bookingSeat);
            buttonCancel = view.FindViewById<Button>(Resource.Id.buttonCancel);
            buttonCancel.Click += (_, __) => CancelBooking();
            ViewBookingDetails();
            return view;
        }

        public void ViewBookingDetails()
        {
            DateTime timeStart = DateTime.Parse(bookingDetail.period.timeStart.ToString(), System.Globalization.CultureInfo.CurrentCulture);
            DateTime timeEnd = DateTime.Parse(bookingDetail.period.timeEnd.ToString(), System.Globalization.CultureInfo.CurrentCulture);
            
            bookingTime.Text = "Your booking is at " + timeStart.ToString("hh:mm tt");
            bookingCode.Text = bookingDetail.bookingCode;
            bookingDate.Text = bookingDetail.bookingDate.ToString("MMMM dd, yyyy");
            bookingCompleteTime.Text = timeStart.ToString("hh:mm tt") + " to " + timeEnd.ToString("hh:mm tt");
            if (bookingDetail.seat.Type == "1") bookingSeat.Text = bookingDetail.seat.Name + " - Carrel Desk";
            else bookingSeat.Text = bookingDetail.seat.Name + " - Carrel Desk with Outlet";
        }

        private void CancelBooking()
        {
            AlertDialog.Builder dialog = new AlertDialog.Builder(this.Activity);
            AlertDialog alert = dialog.Create();

            alert.SetTitle("Confirm Irreversible Action");
            alert.SetMessage("Are you sure you want to cancel your booking?");
            alert.SetButton("Yes", async (c, ev) =>
            {
                var success = await service.CancelBooking(bookingDetail.id);
                if (!success)
                {
                    Toast.MakeText(Activity, "Failed to Cancel Booking", ToastLength.Short);
                    return;
                }
                Toast.MakeText(Activity, "Successfully Cancelled Booking", ToastLength.Short).Show();
                var activty = Activity as MainActivity;
                activty.GoToCurrentBookingFragment();
            });
            alert.SetButton2("No", (c, ev) =>{ // do nothing
            });
            alert.Show(); 
        }
    }
}