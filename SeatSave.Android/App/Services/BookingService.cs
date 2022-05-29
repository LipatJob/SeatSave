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
using SeatSave.Android.App.Models;
using Newtonsoft.Json;
using SeatSave.Android.App.Helpers;

namespace SeatSave.Android.App.Services
{
    class BookingService
    {
        HttpClient client;
        public BookingService()
        {
            client = new HttpClient();
            var authenticationService = new AuthenticationService(SharedPreferencesSingleton.Instance);
            client.DefaultRequestHeaders.Authorization = authenticationService.CreateHeader();
        }

        public async Task<string> GetBookingDetails(int id) {
            var uri = new Uri(Endpoints.Booking + id.ToString()) ;
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        public async Task<Booking> GetCurrentBooking()
        {
            var uri = new Uri(Endpoints.CurrentBooking);
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            var booking = JsonConvert.DeserializeObject<Booking>(content);
            return booking;
        }

    }
}