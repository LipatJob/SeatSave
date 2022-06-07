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
    public class CheckCurrentBookingFragment : AndroidX.Fragment.App.Fragment
    {
        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            CheckCurrentBooking();
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            return inflater.Inflate(Resource.Layout.loading_current_booking, container, false);
        }

        public async void CheckCurrentBooking()
        {
            var service = new BookingService();
            var curentBooking = await service.GetCurrentBooking();
           
            if (curentBooking.status == null)
            {
                var fragment = new CreateBookingFragment();
                var activty = Activity as MainActivity;
                activty.ChangeFragment(fragment);
            }
            else
            {
                var fragment = new CannotBookFragment();
                var activty = Activity as MainActivity;
                activty.ChangeFragment(fragment);
            }
        }     
    }
}