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
        int selectedDateId = 0;
        int selectedPeriodId = 0;
        int selectedSeatId = 0;

        readonly List<string> dates = new List<string>();
        readonly List<string> periods = new List<string>();
        readonly List<string> seats = new List<string>();

        RecyclerView dateRecyclerView;
        RecyclerView periodRecyclerView;
        RecyclerView seatRecyclerView;

        LinearLayout dateGroup;
        LinearLayout periodGroup;
        LinearLayout seatGroup;

        Button bookSeatbutton;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.create_booking);

            dateGroup = FindViewById<LinearLayout>(Resource.Id.dateGroup);
            periodGroup = FindViewById<LinearLayout>(Resource.Id.periodGroup);
            seatGroup = FindViewById<LinearLayout>(Resource.Id.seatGroup);
            bookSeatbutton = FindViewById<Button>(Resource.Id.bookSeatButton);

            periodGroup.Visibility = ViewStates.Gone;
            seatGroup.Visibility = ViewStates.Gone;
            bookSeatbutton.Visibility = ViewStates.Gone;

            dates.AddRange(new []{
                "Sample 1",
                "Sample 2",
                "Sample 3",
            });

            periods.AddRange(new List<string>() {
                "Sample 1",
                "Sample 2",
                "Sample 3",
            });

            seats.AddRange(new List<string>() {
                "Sample 1",
                "Sample 2",
                "Sample 3",
            });

            dateRecyclerView = FindViewById<RecyclerView>(Resource.Id.date_recyler_view);
            var dateAdapter = new DateRecyclerViewAdapter(this, dates);
            dateAdapter.ItemSelected += (_, index) => SelectDate(index);
            dateRecyclerView.SetAdapter(dateAdapter);
            dateRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            periodRecyclerView = FindViewById<RecyclerView>(Resource.Id.period_recycler_view);
            var periodAdapter = new PeriodRecyclerViewAdapter(this, periods);
            periodAdapter.ItemSelected += (_, index) => SelectPeriod(index);
            periodRecyclerView.SetAdapter(periodAdapter);
            periodRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            seatRecyclerView = FindViewById<RecyclerView>(Resource.Id.seat_recycler_view);
            var seatAdapter = new SeatRecyclerViewAdapter(this, seats);
            seatAdapter.ItemSelected += (_, index) => SelectSeat(index);
            seatRecyclerView.SetAdapter(seatAdapter);
            seatRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            bookSeatbutton.Click += (_, __) => BookSeat(selectedDateId, selectedPeriodId, selectedSeatId);
        }

        private void SelectDate(int key)
        {
            selectedDateId = key;
            periodGroup.Visibility = ViewStates.Visible;
            Toast.MakeText(this, "You selected Date " + key, ToastLength.Short).Show();
        }

        private void SelectPeriod(int key)
        {
            selectedPeriodId = key;
            seatGroup.Visibility = ViewStates.Visible;
            Toast.MakeText(this, "You selected Period " + key, ToastLength.Short).Show();
        }

        private void SelectSeat(int key)
        {
            selectedSeatId = key;
            bookSeatbutton.Visibility = ViewStates.Visible;
            Toast.MakeText(this, "You selected Seat " + key, ToastLength.Short).Show();
        }

        private void BookSeat(int selectedDateId, int selectedPeriodId, int selectedSeatId)
        {
            Toast.MakeText(this, $"Creating booking for Date:{selectedDateId} Period:{selectedPeriodId} Seat:{selectedSeatId}", ToastLength.Short).Show();
        }
    }
}