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
    class PeriodRecyclerViewAdapter : RecyclerView.Adapter
    {
        public Context Context { get; }
        public List<Period> Periods { get; }

        public event EventHandler<Period> ItemSelected;
        public Period selectedPeriod; // TODO: REFACTOR THIS


        public PeriodRecyclerViewAdapter(Context context, List<Period> periods)
        {
            Context = context;
            Periods = periods;
        }

        public override int ItemCount => Periods.Count;

        public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
        {
            var newHolder = holder as PeriodRecyclerViewAdapter.ViewHolder;
            var period = Periods[position];
            var timeStartString = new DateTime(period.timeStart.Ticks).ToString("h:mm tt");
            var timeEndString = new DateTime(period.timeEnd.Ticks).ToString("h:mm tt");
            newHolder.periodButton.Text = timeStartString + "\n" + timeEndString;
            newHolder.periodButton.Click += (_, __) => ItemSelected(this, period);

            int colorResource = period == selectedPeriod ? Resource.Color.rodeoDust : Resource.Color.pearlBrush;
            newHolder.periodButton.Background.SetTint(Context.GetColor(colorResource));
        }

        public override RecyclerView.ViewHolder OnCreateViewHolder(ViewGroup parent, int viewType)
        {
            LayoutInflater inflater = LayoutInflater.From(Context);
            View view = inflater.Inflate(Resource.Layout.period_selection, parent, false);

            return new PeriodRecyclerViewAdapter.ViewHolder(view);
        }

        public class ViewHolder : RecyclerView.ViewHolder
        {
            public Button periodButton;
            public ViewHolder(View itemView) : base(itemView)
            {
                periodButton = itemView.FindViewById<Button>(Resource.Id.period_button);
            }
        }
    }
}