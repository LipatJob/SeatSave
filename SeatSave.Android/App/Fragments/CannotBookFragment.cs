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
    public class CannotBookFragment : AndroidX.Fragment.App.Fragment
    {
        Button viewBookingButton;

        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            var view =  inflater.Inflate(Resource.Layout.cannot_book, container, false);
            viewBookingButton = view.FindViewById<Button>(Resource.Id.viewBookingDetails);
            viewBookingButton.Click += (_, __) => ViewBooking();

            return view;
        }

        private void ViewBooking()
        {
            var fragment = new CurrentBookingFragment();
            var activty = Activity as MainActivity;
            activty.ChangeFragment(fragment);
        }
    }
}