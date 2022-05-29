using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SeatSave.Android.App.Services;
using Newtonsoft.Json.Linq;

namespace SeatSave.Android.App.Activities
{
    [Activity(Label = "CheckedInBookingActivity")]
    public class CheckedInBookingActivity : Activity
    {
        TextView bookingTime, bookingDate, bookingCompleteTime, bookingSeat;
        Button buttonCheckOut;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            SetContentView(Resource.Layout.checked_in_booking);

            bookingTime = FindViewById<TextView>(Resource.Id.bookingTime);
            bookingDate = FindViewById<TextView>(Resource.Id.bookingDate);
            bookingCompleteTime = FindViewById<TextView>(Resource.Id.bookingCompleteTime);
            bookingSeat = FindViewById<TextView>(Resource.Id.bookingSeat);
            buttonCheckOut = FindViewById<Button>(Resource.Id.buttonCheckOut);
            //buttonCancel.Click += this.OnAlertYesNoClicked;
            ViewBookingDetails();
        }
        public async void ViewBookingDetails()
        {
            int bookingID = 7;
            var service = new BookingService();
            var data = await service.GetBookingDetails(bookingID);
            JObject json = JObject.Parse(data);
            var curentBooking = await service.GetCurrentBooking();

            DateTime timeStart = DateTime.Parse(json["period"]["timeStart"].ToString(), System.Globalization.CultureInfo.CurrentCulture);
            DateTime timeEnd = DateTime.Parse(json["period"]["timeEnd"].ToString(), System.Globalization.CultureInfo.CurrentCulture);
            DateTime date = DateTime.Parse(json["bookingDate"].ToString(), System.Globalization.CultureInfo.CurrentCulture);

            bookingTime.Text = "Your booking is until " + timeEnd.ToString("hh:mm tt");
            bookingDate.Text = date.ToString("MMMM dd, yyyy");
            bookingCompleteTime.Text = timeStart.ToString("hh:mm tt") + " to " + timeEnd.ToString("hh:mm tt");
            bookingSeat.Text = json["seat"]["name"].ToString() + " - " + json["seat"]["type"].ToString();
        }
    }
}