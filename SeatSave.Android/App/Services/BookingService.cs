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
using System.Net;

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

        // for sample only
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
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var content = await response.Content.ReadAsStringAsync();
                var booking = JsonConvert.DeserializeObject<Booking>(content);
                return booking;
            }
            else
            {
                return null;
            }
        }


        public async Task<bool> CancelBooking(int id)
        {       
            var uri = new Uri(Endpoints.BookingWithId(id));    
            string body = "\"Cancelled\"";
            var response = await client.PatchAsync(uri, new StringContent(body, Encoding.UTF8, "application/json"));
            return response.StatusCode == HttpStatusCode.OK;
        }
        public async Task<bool> CheckOutBooking(int id)
        {
            var uri = new Uri(Endpoints.BookingWithId(id));
            string body = "\"Checked Out\"";
            var response = await client.PatchAsync(uri, new StringContent(body, Encoding.UTF8, "application/json"));
            return response.StatusCode == HttpStatusCode.OK;
        }
    }
}