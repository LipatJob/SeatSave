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
    class SampleService
    {
        HttpClient client;
        public SampleService()
        {
            client = new HttpClient();
        }

        public async Task<string> GetSampleData() {
            var uri = new Uri(string.Format(Endpoints.Sample, string.Empty));
            var response = await client.GetAsync(uri);
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

    }
}