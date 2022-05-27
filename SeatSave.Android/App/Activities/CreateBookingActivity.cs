using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using SeatSave.Android.App.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Activities
{
    [Activity(Label = "CreateBookingActivity")]
    public class CreateBookingActivity : Activity
    {

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.create_booking);

            RecyclerView dateRecyclerView = FindViewById<RecyclerView>(Resource.Id.date_recyler_view);
            var dateAdapter = new DateRecyclerViewAdapter(this, new List<string>() {
                "Sample 1",
                "Sample 2",
                "Sample 3",
            });
            dateRecyclerView.SetAdapter(dateAdapter);
            dateRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            RecyclerView periodRecyclerView = FindViewById<RecyclerView>(Resource.Id.period_recycler_view);
            var periodAdapter = new PeriodRecyclerViewAdapter(this, new List<string>() {
                "Sample 1",
                "Sample 2",
                "Sample 3",
            });
            periodRecyclerView.SetAdapter(periodAdapter);
            periodRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            RecyclerView saetRecyclerView = FindViewById<RecyclerView>(Resource.Id.seat_recycler_view);
            var seatAdapter = new SeatRecyclerViewAdapter(this, new List<string>() {
                "Sample 1",
                "Sample 2",
                "Sample 3",
                "Sample 4",
                "Sample 5",
                "Sample 6",
                "Sample 7",
            });
            saetRecyclerView.SetAdapter(seatAdapter);
            saetRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));
        }
    }
}