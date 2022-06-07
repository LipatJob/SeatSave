﻿using Android.App;
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
    public class Seat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}