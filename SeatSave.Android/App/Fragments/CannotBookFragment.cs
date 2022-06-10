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
    public class CannotBookFragment : AndroidX.Fragment.App.Fragment
    {
        Button buttonViewBook;

        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            var intent = new Intent();

            var view =  inflater.Inflate(Resource.Layout.cannot_book, container, false);
            buttonViewBook = view.FindViewById<Button>(Resource.Id.buttonViewBook);
            buttonViewBook.Click += (_, __) => ViewBooking();
            return view;
        }
        private void ViewBooking()
        {
            var activty = Activity as MainActivity;
            activty.GoToCurrentBookingFragment();
        }
    }
}