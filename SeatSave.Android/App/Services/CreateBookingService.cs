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
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Android.App.Services
{
    class CreateBookingService
    {
        HttpClient client;
        public CreateBookingService()
        {
            client = new HttpClient();
        }

        public async Task<DateTime> GetBookableDates()
        {
            throw new NotImplementedException();
        }

        public async Task<Period> GetBookablePeriodsForDate(DateTime date)
        {
            throw new NotImplementedException();
        }

        public async Task<Seat> GetBookableSeatsForPeriod(DateTime date, Period period)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CreateBooking(DateTime date, Period period, Seat seatid)
        {
            throw new NotImplementedException();
        }
    }
}