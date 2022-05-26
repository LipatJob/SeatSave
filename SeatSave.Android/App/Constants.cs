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

namespace SeatSave.Android.App
{
    public static class Constants
    {
        public const string DevelopmentHost = "https://localhost:7175/";
        public const string ProductionHost = "https://seatsave.azurewebsites.net";

        public const string SampleUri = ProductionHost + "/Api/Sample";
        public const string AuthenticationUri = ProductionHost + "/Api/Authentication";

    }
}