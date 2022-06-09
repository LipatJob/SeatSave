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
    public class CheckedInBookingFragment : AndroidX.Fragment.App.Fragment
    {
        TextView bookingTime, bookingDate, bookingCompleteTime, bookingSeat;
        Button buttonCheckOut;

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
            var view =  inflater.Inflate(Resource.Layout.checked_in_booking, container, false);
            service = new BookingService();
            bookingTime = view.FindViewById<TextView>(Resource.Id.bookingTime);
            bookingDate = view.FindViewById<TextView>(Resource.Id.bookingDate);
            bookingCompleteTime = view.FindViewById<TextView>(Resource.Id.bookingCompleteTime);
            bookingSeat = view.FindViewById<TextView>(Resource.Id.bookingSeat);
            buttonCheckOut = view.FindViewById<Button>(Resource.Id.buttonCheckOut);
            buttonCheckOut.Click += (_, __) => CheckOutBooking();
            ViewBookingDetails();
            return view;
        }

        public void ViewBookingDetails()
        {
            DateTime timeStart = DateTime.Parse(bookingDetail.period.timeStart.ToString(), System.Globalization.CultureInfo.CurrentCulture);
            DateTime timeEnd = DateTime.Parse(bookingDetail.period.timeEnd.ToString(), System.Globalization.CultureInfo.CurrentCulture);

            bookingTime.Text = "Your booking is until " + timeEnd.ToString("hh:mm tt");
            bookingDate.Text = bookingDetail.bookingDate.ToString("MMMM dd, yyyy");
            bookingCompleteTime.Text = timeStart.ToString("hh:mm tt") + " to " + timeEnd.ToString("hh:mm tt");
            if (bookingDetail.seat.Type == "1") bookingSeat.Text = bookingDetail.seat.Name + " - Carrel Desk";
            else bookingSeat.Text = bookingDetail.seat.Name + " - Carrel Desk with Outlet";
        }

        private async void CheckOutBooking()
        {
            var success = await service.CheckOutBooking(bookingDetail.id);
            if (!success)
            {
                Toast.MakeText(Activity, "Failed to Check Out Booking", ToastLength.Short);
                return;
            }
           
            Toast.MakeText(Activity, "Successfully Checked Out Booking", ToastLength.Short).Show();

            AlertDialog.Builder dialog = new AlertDialog.Builder(this.Activity);
            AlertDialog alert = dialog.Create();

            alert.SetTitle("See you next time!");
            alert.SetMessage("You have checked out of your booking. You can now book a seat for your next visit.");
            alert.SetButton("Ok", (c, ev) =>
            {
                var activty = Activity as MainActivity;
                activty.GoToCreateBookingFragment();
            });
            alert.Show();  
        }

        private void RefreshBooking()
        {
            var activty = Activity as MainActivity;
            activty.GoToCurrentBookingFragment();
        }
    }
}