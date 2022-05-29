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
    class StatusHistory
    {
        public int Id { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public DateTime? DateTimeCanceled { get; set; }
        public DateTime? DateTimeCheckedIn { get; set; }
        public DateTime? DateTimeCheckedOut { get; set; }
    }
}