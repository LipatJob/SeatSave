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
    public class CurrentBookingFragment : AndroidX.Fragment.App.Fragment
    {
        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            ViewCurrentBooking();
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            return inflater.Inflate(Resource.Layout.loading, container, false);
        }

        public async void ViewCurrentBooking()
        {
            var service = new BookingService();
            var curentBooking = await service.GetCurrentBooking();
           
            if (curentBooking.status == null)
            {
                var fragment = new NoBookingFragment();
                var activty = Activity as MainActivity;
                activty.ChangeFragment(fragment);
            }
            else if (curentBooking.status == "Pending")
            {
                var fragment = new PendingBookingFragment();
                fragment.SetDetail(curentBooking);
                var activty = Activity as MainActivity;
                activty.ChangeFragment(fragment);
            }
            else if (curentBooking.status == "Checked In")
            {
                var fragment = new CheckedInBookingFragment();
                fragment.SetDetail(curentBooking);
                var activty = Activity as MainActivity;
                activty.ChangeFragment(fragment);
            }
        }     
    }
}