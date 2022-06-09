using System;
using Android.App;
using Android.Content;
using Android.Content.PM;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using AndroidX.AppCompat.App;
using AndroidX.AppCompat.Widget;
using AndroidX.Core.View;
using AndroidX.DrawerLayout.Widget;
using Google.Android.Material.FloatingActionButton;
using Google.Android.Material.Navigation;
using Google.Android.Material.Snackbar;
using SeatSave.Android.App.Activities;
using SeatSave.Android.App.Helpers;
using SeatSave.Android.App.Services;
using static Android.Views.View;

namespace SeatSave.Android
{
    [Activity(Label = "Sample Activity")]
    public class SampleActivity : AppCompatActivity
    {
        Button sampleButton;
        Button loginButton;
        Button cannotBookButton;
        Button checkedInBookingButton;
        Button noBookingButton;
        Button pendingBookingButton;
        Button createBookingButton;
        TextView text;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            SetContentView(Resource.Layout.sample);

            sampleButton = FindViewById<Button>(Resource.Id.sampleButton);
            text = FindViewById<TextView>(Resource.Id.sampleText);

            loginButton = FindViewById<Button>(Resource.Id.loginButton);
            cannotBookButton = FindViewById<Button>(Resource.Id.cannotBookButton);
            checkedInBookingButton = FindViewById<Button>(Resource.Id.checkedInBookingButton);
            noBookingButton = FindViewById<Button>(Resource.Id.noBookingButton);
            pendingBookingButton = FindViewById<Button>(Resource.Id.pendingBookingButton);
            createBookingButton = FindViewById<Button>(Resource.Id.createBookingButton);

            sampleButton.Click += (_, __) => SampleAction();
            loginButton.Click += (_, __) => StartActivity(new Intent(this, typeof(LoginActivity)));
            cannotBookButton.Click += (_, __) => StartActivity(new Intent(this, typeof(CannotBookActivity)));
            checkedInBookingButton.Click += (_, __) => StartActivity(new Intent(this, typeof(CheckedInBookingActivity)));
            noBookingButton.Click += (_, __) => StartActivity(new Intent(this, typeof(NoBookingActivity)));
            pendingBookingButton.Click += (_, __) => StartActivity(new Intent(this, typeof(PendingBookingActivity)));

            SharedPreferencesSingleton.Initialize(this);
        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        public async void SampleAction() {
            var service = new SampleService();
            var data = await service.GetSampleData();
            text.Text = data;
        }


    }
}