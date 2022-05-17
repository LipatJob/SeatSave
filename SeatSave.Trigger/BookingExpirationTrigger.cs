using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace SeatSave.Trigger
{
    public class BookingExpirationTrigger
    {
        private const string HOST = "";
        private const string END_POINT = "";

        private static readonly HttpClient client = new HttpClient();

        [FunctionName("BookingExpirationTrigger")]
        public void Run([TimerTrigger("0 */5 * * * *")] TimerInfo myTimer, ILogger log)
        {
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri(HOST);
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                client.DefaultRequestHeaders
                      .Accept
                      .Add(new MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header
            }

            var request = new HttpRequestMessage(new HttpMethod("PATCH"), END_POINT)
            {
                Content = new StringContent("Expire", Encoding.UTF8, "application/json"),
            };
            client
                .SendAsync(request)
                .ContinueWith(responseTask =>
                {
                    string res = responseTask.Result.Content.ReadAsStringAsync().Result;
                    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}, Response: {res}");
                });
        }
    }
}
