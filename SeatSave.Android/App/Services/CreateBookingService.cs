using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Newtonsoft.Json;
using SeatSave.Android.App.Helpers;
using SeatSave.Android.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Android.App.Services
{
    class CreateBookingService
    {
        private HttpClient client;
        private AuthenticationService authenticationService;


        public CreateBookingService()
        {
            client = HttpClientSingleton.Instance;
            authenticationService = new AuthenticationService(SharedPreferencesSingleton.Instance);
            client.DefaultRequestHeaders.Authorization = authenticationService.CreateHeader();
        }

        public async Task<IEnumerable<DateTime>> GetBookableDates()
        {
            var uri = new Uri(Endpoints.Schedule);
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            
            var dates = JsonConvert.DeserializeObject<List<DateTime>>(content);
            return dates;
        }

        public async Task<IEnumerable<Period>> GetBookablePeriodsForDate(DateTime date)
        {
            var uri = new Uri(Endpoints.BookablePeriods(date));
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            var periods = JsonConvert.DeserializeObject<List<Period>>(content);
            return periods;
        }

        public async Task<IEnumerable<Seat>> GetBookableSeatsForPeriod(DateTime date, Period period)
        {
            var uri = new Uri(Endpoints.BookableSeats(date, period));
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            var seats = JsonConvert.DeserializeObject<List<Seat>>(content);
            return seats;
        }

        public async Task<bool> CreateBooking(DateTime date, Period period, Seat seat)
        {
            var uri = new Uri(Endpoints.Booking);
            var data = JsonConvert.SerializeObject(new
            {
                isoDate = date.ToString("yyyy-MM-dd"),
                periodId = period.Id,
                seatId = seat.Id
            });
            var response = await client.PostAsync(uri, new StringContent(data, Encoding.UTF8, "application/json"));
            return response.StatusCode == HttpStatusCode.OK;
        }

    }
}