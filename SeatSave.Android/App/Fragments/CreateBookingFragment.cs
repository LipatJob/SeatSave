using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Util;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using SeatSave.Android.App.Activities;
using SeatSave.Android.App.Models;
using SeatSave.Android.App.Services;
using SeatSave.Android.App.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Fragments
{
    public class CreateBookingFragment : AndroidX.Fragment.App.Fragment
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

        ProgressBar dateProgressBar;
        ProgressBar periodProgressBar;
        ProgressBar seatProgressBar;

        Button bookSeatbutton;

        CreateBookingService service;

        public override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
        }

        public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
        {
            var view = inflater.Inflate(Resource.Layout.create_booking, container, false);
            service = new CreateBookingService();

            dateGroup = view.FindViewById<LinearLayout>(Resource.Id.dateGroup);
            periodGroup = view.FindViewById<LinearLayout>(Resource.Id.periodGroup);
            seatGroup = view.FindViewById<LinearLayout>(Resource.Id.seatGroup);
            bookSeatbutton = view.FindViewById<Button>(Resource.Id.bookSeatButton);

            dateProgressBar = view.FindViewById<ProgressBar>(Resource.Id.dateProgressLoader);
            periodProgressBar = view.FindViewById<ProgressBar>(Resource.Id.periodProgressLoader);
            seatProgressBar = view.FindViewById<ProgressBar>(Resource.Id.seatProgressLoader);
            dateProgressBar.Visibility = ViewStates.Gone;
            periodProgressBar.Visibility = ViewStates.Gone;
            seatProgressBar.Visibility = ViewStates.Gone;


            periodGroup.Visibility = ViewStates.Gone;
            seatGroup.Visibility = ViewStates.Gone;
            bookSeatbutton.Visibility = ViewStates.Gone;


            dateRecyclerView = view.FindViewById<RecyclerView>(Resource.Id.date_recyler_view);
            dateAdapter = new DateRecyclerViewAdapter(Activity, dates);
            dateAdapter.ItemSelected += (_, item) => SelectDate(item);
            dateRecyclerView.SetAdapter(dateAdapter);
            dateRecyclerView.SetLayoutManager(new LinearLayoutManager(Activity, 0, false));

            periodRecyclerView = view.FindViewById<RecyclerView>(Resource.Id.period_recycler_view);
            periodAdapter = new PeriodRecyclerViewAdapter(Activity, periods);
            periodAdapter.ItemSelected += (_, item) => SelectPeriod(item);
            periodRecyclerView.SetAdapter(periodAdapter);
            periodRecyclerView.SetLayoutManager(new LinearLayoutManager(Activity, 0, false));

            seatRecyclerView = view.FindViewById<RecyclerView>(Resource.Id.seat_recycler_view);
            seatAdapter = new SeatRecyclerViewAdapter(Activity, seats);
            seatAdapter.ItemSelected += (_, item) => SelectSeat(item);
            seatRecyclerView.SetAdapter(seatAdapter);
            seatRecyclerView.SetLayoutManager(new LinearLayoutManager(Activity, 0, false));

            bookSeatbutton.Click += (_, __) => BookSeat(selectedDate.Value, selectedPeriod, selectedSeat);
            InitalizeDates();

            return view;
        }

        private async void InitalizeDates()
        {
            dateProgressBar.Visibility = ViewStates.Visible;
            dates.Clear();
            var bookableDates = await service.GetBookableDates();
            dates.AddRange(bookableDates);
            dateAdapter.NotifyDataSetChanged();
            dateProgressBar.Visibility = ViewStates.Gone;
        }

        private async void SelectDate(DateTime date)
        {
            periodProgressBar.Visibility = ViewStates.Visible;
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

            Toast.MakeText(Activity, "You selected Date " + date.ToString("yyyy-MM-dd"), ToastLength.Short).Show();
            periodProgressBar.Visibility = ViewStates.Gone;
        }

        private async void SelectPeriod(Period period)
        {
            seatProgressBar.Visibility = ViewStates.Visible;
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

            Toast.MakeText(Activity, "You selected Period " + period.Id, ToastLength.Short).Show();
            seatProgressBar.Visibility = ViewStates.Gone;
        }

        private async void SelectSeat(Seat seat)
        {
            selectedSeat = seat;
            periodGroup.Visibility = ViewStates.Visible;
            seatGroup.Visibility = ViewStates.Visible;
            bookSeatbutton.Visibility = ViewStates.Visible;

            seatAdapter.selectedSeat = selectedSeat; // TODO: REFACTOR THIS
            seatAdapter.NotifyDataSetChanged();

            Toast.MakeText(Activity, "You selected Seat " + seat.Name, ToastLength.Short).Show();
        }

        private async void BookSeat(DateTime selectedDate, Period selectedPeriod, Seat selectedSeat)
        {
            var success = await service.CreateBooking(selectedDate, selectedPeriod, selectedSeat);
            if (!success)
            {
                Toast.MakeText(Activity, "Booking failed", ToastLength.Short);
                return;
            }

            Toast.MakeText(Activity, $"Creating booking for Date:{selectedDate} Period:{selectedPeriod} Seat:{selectedSeat}", ToastLength.Short).Show();

            var activty = Activity as MainActivity;
            activty.GoToCurrentBookingFragment();
        }
    }
}