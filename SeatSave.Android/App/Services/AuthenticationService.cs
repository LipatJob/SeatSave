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

namespace SeatSave.Android.App.Services
{
    class AuthenticationService
    {
        public bool TryLogin(string email, string password) {
            return email == "asdf" && password == "1234";
        }
    }
}