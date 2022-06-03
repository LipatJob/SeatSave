using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Google.Android.Material.TextField;
using SeatSave.Android.App.Helpers;
using SeatSave.Android.App.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeatSave.Android.App.Activities
{
    [Activity(Label = "LoginActivity")]
    public class LoginActivity : Activity
    {
        TextInputLayout emailEditTextLayout;
        TextInputLayout passwordEditTextLayout;
        EditText emailEditText;
        EditText passwordEditText;
        Button loginButton;
        AuthenticationService authService;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.login);
            
            authService = new AuthenticationService(SharedPreferencesSingleton.Instance);

            emailEditText = FindViewById<EditText>(Resource.Id.emailEditText);
            passwordEditText = FindViewById<EditText>(Resource.Id.passwordEditText);
            loginButton = FindViewById<Button>(Resource.Id.loginButton);
            passwordEditTextLayout = FindViewById<TextInputLayout>(Resource.Id.passwordEditTextLayout);
            emailEditTextLayout = FindViewById<TextInputLayout>(Resource.Id.emailEditTextLayout);

            emailEditText.AfterTextChanged += (_, __) => afterEmailEditTextChanged();
            passwordEditText.AfterTextChanged += (_, __) => afterPasswordEditTextChanged();

            loginButton.Click += (_, __) => Login();
        }

        private void afterEmailEditTextChanged()
        {
            if (emailEditText.Text == "") {
                emailEditTextLayout.Error = "Please enter your email";
                return;
            }
            emailEditTextLayout.Error = null;
        }

        private void afterPasswordEditTextChanged()
        {
            if (passwordEditText.Text == "")
            {
                passwordEditTextLayout.Error = "Please enter your password";
                return;
            }
            passwordEditTextLayout.Error = null;
        }

        public async void Login()
        {
            var email = emailEditText.Text;
            var password = passwordEditText.Text;

            var success = await authService.TryLogin(email, password);
            if (success)
            {
                Intent intent = new Intent(this, typeof(MainActivity));
                intent.AddFlags(ActivityFlags.NewTask);
                intent.AddFlags(ActivityFlags.ClearTask);
                base.StartActivity(intent);
            }
            else
            {
                emailEditTextLayout.Error = "Please check your email";
                passwordEditTextLayout.Error = "Please check your password";
            }
        }


    }


}