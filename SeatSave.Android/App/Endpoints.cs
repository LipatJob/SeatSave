using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using SeatSave.Android.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App
{
    public static class Endpoints
    {
        public const string DevelopmentHost = "https://localhost:7175/";
        public const string ProductionHost = "https://seatsave.azurewebsites.net";

        public const string Authentication = "https://seatsave.azurewebsites.net/Api/Authentication";
        public const string Sample = "https://seatsave.azurewebsites.net/Api/Sample";
        public const string Booking = "https://seatsave.azurewebsites.net/Api/Booking/";
        public const string CurrentBooking = "https://seatsave.azurewebsites.net/Api/Booking/Current";
        public static string BookingWithId(int id) => "https://seatsave.azurewebsites.net/Api/Booking/{id}";

        public const string Schedule = "https://seatsave.azurewebsites.net/Api/Schedule";
        public static string BookablePeriods(DateTime date) => $"https://seatsave.azurewebsites.net/Api/Schedule/{date.ToString("yyyy-MM-dd")}/Periods";

        public static string BookableSeats(DateTime date, Period period) => $"https://seatsave.azurewebsites.net/Api/Schedule/{date.ToString("yyyy-MM-dd")}/{period.Id}/Seat";
    }
}