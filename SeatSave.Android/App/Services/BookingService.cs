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
using System.Net.Http;
using System.Threading.Tasks;

namespace SeatSave.Android.App.Services
{
    class BookingService
    {
        HttpClient client;
        public BookingService()
        {
            client = new HttpClient();
        }

        public async Task<string> GetBookingDetails(int id) {
            var uri = new Uri(string.Format(Constants.GetBookingDetails + id.ToString())) ;
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

    }
}