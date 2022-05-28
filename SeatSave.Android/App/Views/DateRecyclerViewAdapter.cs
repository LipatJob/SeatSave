using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using Google.Android.Material.Button;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Views
{
    class DateRecyclerViewAdapter : RecyclerView.Adapter
    {

        public Context Context { get; }
        public List<DateTime> Dates { get; }

        public event EventHandler<DateTime> ItemSelected;

        public DateTime selectedDate; // TODO: REFACTOR THIS

        public DateRecyclerViewAdapter(Context context, List<DateTime> dates)
        {
            Context = context;
            Dates = dates;
        }

        public override int ItemCount => Dates.Count;

        public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
        {
            var newHolder= holder as DateRecyclerViewAdapter.ViewHolder;
            var date = Dates[position];
            newHolder.dateButton.Text = date.ToString();
            newHolder.dateButton.Click += (_, __) => ItemSelected(this, date);

            int colorResource = date == selectedDate ? Resource.Color.rodeoDust : Resource.Color.pearlBrush;
            newHolder.dateButton.Background.SetTint(Context.GetColor(colorResource));
        }

        public override RecyclerView.ViewHolder OnCreateViewHolder(ViewGroup parent, int viewType)
        {
            LayoutInflater inflater= LayoutInflater.From(Context);
            View view = inflater.Inflate(Resource.Layout.date_selection, parent, false);

            return new DateRecyclerViewAdapter.ViewHolder(view);
        }

        public class ViewHolder : RecyclerView.ViewHolder
        {
            public MaterialButton dateButton;
            public ViewHolder(View itemView) : base(itemView)
            {
                dateButton = itemView.FindViewById<MaterialButton>(Resource.Id.date_button);
            }
        }
    }
}