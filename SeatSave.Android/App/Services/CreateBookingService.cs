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

        public async Task<IEnumerable<DateTime>> GetBookableDates()
        {
            Random random = new Random();
            return Enumerable.Range(0, random.Next(3, 10))
               .Select(e => DateTime.Today.AddDays(random.Next(-100, 100)));
        }

        public async Task<IEnumerable<Period>> GetBookablePeriodsForDate(DateTime date)
        {
            Random random = new Random();
            return Enumerable.Range(0, random.Next(3, 10))
                .Select(e => new Period()
                {
                    Id = e,
                    timeEnd = DateTime.Today.AddHours(random.Next(100)).TimeOfDay,
                    timeStart = DateTime.Today.AddHours(random.Next(100)).TimeOfDay
                });
        }

        public async Task<IEnumerable<Seat>> GetBookableSeatsForPeriod(DateTime date, Period period)
        {
            Random random = new Random();
            return Enumerable.Range(0, random.Next(3, 10))
                .Select(e => new Seat()
                {
                    Id = e,
                    Name = RandomString(random.Next(5, 20))
                });
        }

        public async Task<bool> CreateBooking(DateTime date, Period period, Seat seatid)
        {
            return false;
        }


        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}