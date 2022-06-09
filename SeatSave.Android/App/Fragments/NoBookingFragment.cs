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


namespace SeatSave.Android.App.Fragments
{
    public class NoBookingFragment : AndroidX.Fragment.App.Fragment
    {
        Button bookSeatbutton;

        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            var view =  inflater.Inflate(Resource.Layout.no_booking, container, false);
            bookSeatbutton = view.FindViewById<Button>(Resource.Id.buttonBookSeat);
            bookSeatbutton.Click += (_, __) => BookSeat();
            return view;
        }
        private void BookSeat()
        {
            var activty = Activity as MainActivity;
            activty.GoToCreateBookingFragment();
        }
    }
}