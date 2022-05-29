using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using SeatSave.Android.App.Models;
using SeatSave.Android.App.Services;
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
        DateTime? selectedDate = null;
        Period selectedPeriod = null;
        Seat selectedSeat = null;

        readonly List<DateTime> dates = new List<DateTime>();
        readonly List<Period> periods = new List<Period>();
        readonly List<Seat> seats = new List<Seat>();

        RecyclerView dateRecyclerView;
        RecyclerView periodRecyclerView;
        RecyclerView seatRecyclerView;

        DateRecyclerViewAdapter dateAdapter;
        PeriodRecyclerViewAdapter periodAdapter;
        SeatRecyclerViewAdapter seatAdapter;

        LinearLayout dateGroup;
        LinearLayout periodGroup;
        LinearLayout seatGroup;

        Button bookSeatbutton;

        CreateBookingService service;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.create_booking);
            service = new CreateBookingService();

            dateGroup = FindViewById<LinearLayout>(Resource.Id.dateGroup);
            periodGroup = FindViewById<LinearLayout>(Resource.Id.periodGroup);
            seatGroup = FindViewById<LinearLayout>(Resource.Id.seatGroup);
            bookSeatbutton = FindViewById<Button>(Resource.Id.bookSeatButton);

            periodGroup.Visibility = ViewStates.Gone;
            seatGroup.Visibility = ViewStates.Gone;
            bookSeatbutton.Visibility = ViewStates.Gone;

            InitalizeDates();

            dateRecyclerView = FindViewById<RecyclerView>(Resource.Id.date_recyler_view);
            dateAdapter = new DateRecyclerViewAdapter(this, dates);
            dateAdapter.ItemSelected += (_, item) => SelectDate(item);
            dateRecyclerView.SetAdapter(dateAdapter);
            dateRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            periodRecyclerView = FindViewById<RecyclerView>(Resource.Id.period_recycler_view);
            periodAdapter = new PeriodRecyclerViewAdapter(this, periods);
            periodAdapter.ItemSelected += (_, item) => SelectPeriod(item);
            periodRecyclerView.SetAdapter(periodAdapter);
            periodRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            seatRecyclerView = FindViewById<RecyclerView>(Resource.Id.seat_recycler_view);
            seatAdapter = new SeatRecyclerViewAdapter(this, seats);
            seatAdapter.ItemSelected += (_, item) => SelectSeat(item);
            seatRecyclerView.SetAdapter(seatAdapter);
            seatRecyclerView.SetLayoutManager(new LinearLayoutManager(this, 0, false));

            bookSeatbutton.Click += (_, __) => BookSeat(selectedDate.Value, selectedPeriod, selectedSeat);
        }

        private async void InitalizeDates()
        {
            dates.Clear();
            var bookableDates = await service.GetBookableDates();
            dates.AddRange(bookableDates);
            dateAdapter.NotifyDataSetChanged();
        }

        private async void SelectDate(DateTime date)
        {
            selectedDate = date;
            periodGroup.Visibility = ViewStates.Visible;
            seatGroup.Visibility = ViewStates.Gone;
            bookSeatbutton.Visibility = ViewStates.Gone;
            
            dateAdapter.selectedDate = selectedDate.Value; // TODO: REFACTOR THIS
            dateAdapter.NotifyDataSetChanged();

            periods.Clear();
            var bookablePeriods = await service.GetBookablePeriodsForDate(date);
            periods.AddRange(bookablePeriods);
            periodAdapter.NotifyDataSetChanged();

            Toast.MakeText(this, "You selected Date " + date.ToString("yyyy-MM-dd"), ToastLength.Short).Show();
        }

        private async void SelectPeriod(Period period)
        {
            selectedPeriod = period;
            periodGroup.Visibility = ViewStates.Visible;
            seatGroup.Visibility = ViewStates.Visible;
            bookSeatbutton.Visibility = ViewStates.Gone;

            periodAdapter.selectedPeriod = selectedPeriod; // TODO: REFACTOR THIS
            periodAdapter.NotifyDataSetChanged();

            seats.Clear();
            var bookableSeats = await service.GetBookableSeatsForPeriod(selectedDate.Value, period);
            seats.AddRange(bookableSeats);
            seatAdapter.NotifyDataSetChanged();

            Toast.MakeText(this, "You selected Period " + period.Id, ToastLength.Short).Show();
        }

        private async void SelectSeat(Seat seat)
        {
            selectedSeat = seat;
            periodGroup.Visibility = ViewStates.Visible;
            seatGroup.Visibility = ViewStates.Visible;
            bookSeatbutton.Visibility = ViewStates.Visible;

            seatAdapter.selectedSeat = selectedSeat; // TODO: REFACTOR THIS
            seatAdapter.NotifyDataSetChanged();

            Toast.MakeText(this, "You selected Seat " + seat.Name, ToastLength.Short).Show();
        }

        private async void BookSeat(DateTime selectedDate, Period selectedPeriod, Seat selectedSeat)
        {
            var success = await service.CreateBooking(selectedDate, selectedPeriod, selectedSeat);
            if (!success) {
                Toast.MakeText(this, "Booking failed", ToastLength.Short);
                return;
            }

            Toast.MakeText(this, $"Creating booking for Date:{selectedDate} Period:{selectedPeriod} Seat:{selectedSeat}", ToastLength.Short).Show();
            StartActivity(new Intent(this, typeof(ViewBookingActivity)));
        }
    }
}