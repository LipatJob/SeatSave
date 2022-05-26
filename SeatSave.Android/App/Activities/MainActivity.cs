using Android.App;
using Android.OS;
using Android.Runtime;
using AndroidX.AppCompat.App;
using Android.Content.PM;
using Android.Widget;
using SeatSave.Android.App.Services;

namespace SeatSave.Android
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        Button button;
        TextView text;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            SetContentView(Resource.Layout.activity_main);

            button = FindViewById<Button>(Resource.Id.sampleButton);
            text = FindViewById<TextView>(Resource.Id.sampleText);
            button.Click += (_, __) => SampleAction();
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