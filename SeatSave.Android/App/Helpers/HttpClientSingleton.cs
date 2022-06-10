using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace SeatSave.Android.App.Helpers
{
    class HttpClientSingleton
    {
        private HttpClientSingleton()
        {
        }
        private static readonly Lazy<HttpClient> lazy = new Lazy<HttpClient>(() => new HttpClient());
        public static HttpClient Instance
        {
            get
            {
                return lazy.Value;
            }
        }

    }
}