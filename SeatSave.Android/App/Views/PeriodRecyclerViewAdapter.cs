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
    class PeriodRecyclerViewAdapter : RecyclerView.Adapter
    {
        public Context Context { get; }
        public List<string> Periods { get; }
        public event EventHandler<int> ItemSelected;

        public PeriodRecyclerViewAdapter(Context context, List<string> periods)
        {
            Context = context;
            Periods = periods;
        }

        public override int ItemCount => Periods.Count;

        public override void OnBindViewHolder(RecyclerView.ViewHolder holder, int position)
        {
            var newHolder = holder as PeriodRecyclerViewAdapter.ViewHolder;
            newHolder.periodButton.Text = Periods[position];
            newHolder.periodButton.Click += (_, __) => ItemSelected(this, position);
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