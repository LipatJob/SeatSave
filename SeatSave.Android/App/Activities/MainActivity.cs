using Android.App;
using Android.OS;
using Android.Runtime;
using AndroidX.AppCompat.App;
using Android.Content.PM;
using Android.Widget;
using SeatSave.Android.App.Services;
using Android.Content;
using SeatSave.Android.App.Activities;
using SeatSave.Android.App.Helpers;

namespace SeatSave.Android
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
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
            SetContentView(Resource.Layout.activity_main);

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
            createBookingButton.Click += (_, __) => StartActivity(new Intent(this, typeof(CreateBookingActivity)));

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