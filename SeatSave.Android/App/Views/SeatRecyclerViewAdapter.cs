using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using SeatSave.Android.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Views
{
    class SeatRecyclerViewAdapter : RecyclerView.Adapter
    {
        public Context Context { get; }
        public List<Seat> Seats { get; }
        public event EventHandler<Seat> ItemSelected;
        public Seat selectedSeat; // TODO: REFACTOR THIS

        public SeatRecyclerViewAdapter(Context context, List<Seat> seats)
        {
            Context = context;
            Seats = seats;
        }

        public override int ItemCount => Seats.Count;


        public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
        {
            var newHolder = holder as SeatRecyclerViewAdapter.ViewHolder;
            var seat = Seats[position];
            newHolder.seatButton.Text = seat.Name + "\n" + seat.Id;
            newHolder.seatButton.Click += (_, __) => ItemSelected(this, seat);

            int colorResource = seat == selectedSeat ? Resource.Color.rodeoDust : Resource.Color.pearlBrush;
            newHolder.seatButton.Background.SetTint(Context.GetColor(colorResource));
        }

        public override RecyclerView.ViewHolder OnCreateViewHolder(ViewGroup parent, int viewType)
        {
            LayoutInflater inflater = LayoutInflater.From(Context);
            View view = inflater.Inflate(Resource.Layout.seat_selection, parent, false);

            return new SeatRecyclerViewAdapter.ViewHolder(view);
        }

        public class ViewHolder : RecyclerView.ViewHolder
        {
            public Button seatButton;
            public ViewHolder(View itemView) : base(itemView)
            {
                seatButton = itemView.FindViewById<Button>(Resource.Id.seat_button);
            }
        }
    }
}