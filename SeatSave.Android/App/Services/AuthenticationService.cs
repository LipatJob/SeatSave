using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SeatSave.Android.App.Services
{
    class AuthenticationService
    {

        private HttpClient client;
        private ISharedPreferences pref;
        public AuthenticationService(ISharedPreferences pref)
        {
            this.pref = pref;
            client = new HttpClient();
        }


        public async Task<bool> TryLogin(string email, string password)
        {
            var uri = new Uri(Constants.AuthenticationUri);
            var json = JsonConvert.SerializeObject(new
            {
                email = email,
                password = password,
                userGroup = "Visitor"
            });
            
            var response = await client.PostAsync(uri, new StringContent(json, Encoding.UTF8, "application/json"));
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var token = await response.Content.ReadAsStringAsync();
                StoreToken(token);
                return true;
            }
            else
            {
                return false;
            }


            return false;
        }

        public bool IsLoggedIn()
        {
            string token = GetToken();
            if (token == null) { return false; }
            if (IsTokenExpired(token)) { ClearToken(); return false; }
            return true;
        }

        public void Logout()
        {
            ClearToken();
        }

        private bool IsTokenExpired(string token)
        {
            return false;
        }

        private void StoreToken(string token)
        {
            var edit = pref.Edit();
            edit.PutString("Token", token);
            edit.Commit();
        }

        private string GetToken()
        {
            return pref.GetString("Token", null);
        }

        private void ClearToken()
        {
            var edit = pref.Edit();
            edit.Remove("Token");
            edit.Commit();
        }
    }
}