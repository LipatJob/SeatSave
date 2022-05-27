using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.RecyclerView.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Views
{
    class DateRecyclerViewAdapter : RecyclerView.Adapter
    {

        public Context Context { get; }
        public List<string> Dates { get; }

        public event EventHandler<int> ItemSelected;

        public DateRecyclerViewAdapter(Context context, List<string> dates)
        {
            Context = context;
            Dates = dates;
        }

        public override int ItemCount => Dates.Count;

        public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
        {
            var newHolder= holder as DateRecyclerViewAdapter.ViewHolder;
            newHolder.dateButton.Text = Dates[position];
            newHolder.dateButton.Click += (_, __) => ItemSelected(this, position);
        }

        public override RecyclerView.ViewHolder OnCreateViewHolder(ViewGroup parent, int viewType)
        {
            LayoutInflater inflater= LayoutInflater.From(Context);
            View view = inflater.Inflate(Resource.Layout.date_selection, parent, false);

            return new DateRecyclerViewAdapter.ViewHolder(view);
        }

        public class ViewHolder : RecyclerView.ViewHolder
        {
            public Button dateButton;
            public ViewHolder(View itemView) : base(itemView)
            {
                dateButton = itemView.FindViewById<Button>(Resource.Id.date_button);
            }
        }
    }
}