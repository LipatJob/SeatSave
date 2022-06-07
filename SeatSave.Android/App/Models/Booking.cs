using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Models
{
    public class Booking
    {
        public int id { get; set; }
        public string bookingCode { get; set; }
        public DateTime bookingDate { get; set; }
        public virtual Period period { get; set; }
        public virtual Seat seat { get; set; }
        public string status { get; set; }
        public virtual StatusHistory statusHistory { get; set; }
    }
}