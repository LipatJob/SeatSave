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
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme.NoActionBar", MainLauncher = true)]
    public class MainActivity : AppCompatActivity, NavigationView.IOnNavigationItemSelectedListener
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
            AndroidX.AppCompat.Widget.Toolbar toolbar = FindViewById<AndroidX.AppCompat.Widget.Toolbar>(Resource.Id.toolbar);
            SetSupportActionBar(toolbar);

            FloatingActionButton fab = FindViewById<FloatingActionButton>(Resource.Id.fab);
            fab.Click += FabOnClick;

            DrawerLayout drawer = FindViewById<DrawerLayout>(Resource.Id.drawer_layout);
            ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer, toolbar, Resource.String.navigation_drawer_open, Resource.String.navigation_drawer_close);
            drawer.AddDrawerListener(toggle);
            toggle.SyncState();

            NavigationView navigationView = FindViewById<NavigationView>(Resource.Id.nav_view);
            navigationView.SetNavigationItemSelectedListener(this);

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

        public override void OnBackPressed()
        {
            DrawerLayout drawer = FindViewById<DrawerLayout>(Resource.Id.drawer_layout);
            if (drawer.IsDrawerOpen(GravityCompat.Start))
            {
                drawer.CloseDrawer(GravityCompat.Start);
            }
            else
            {
                base.OnBackPressed();
            }
        }

        public override bool OnCreateOptionsMenu(IMenu menu)
        {
            MenuInflater.Inflate(Resource.Menu.menu_main, menu);
            return true;
        }

        public override bool OnOptionsItemSelected(IMenuItem item)
        {
            int id = item.ItemId;
            if (id == Resource.Id.action_settings)
            {
                return true;
            }

            return base.OnOptionsItemSelected(item);
        }

        private void FabOnClick(object sender, EventArgs eventArgs)
        {
            View view = (View)sender;
            Snackbar.Make(view, "Replace with your own action", Snackbar.LengthLong)
                .SetAction("Action", (IOnClickListener)null).Show();
        }

        public bool OnNavigationItemSelected(IMenuItem item)
        {
            int id = item.ItemId;

            if (id == Resource.Id.nav_camera)
            {
                // Handle the camera action
            }
            else if (id == Resource.Id.nav_gallery)
            {

            }
            else if (id == Resource.Id.nav_slideshow)
            {

            }
            else if (id == Resource.Id.nav_manage)
            {

            }
            else if (id == Resource.Id.nav_share)
            {

            }
            else if (id == Resource.Id.nav_send)
            {

            }

            DrawerLayout drawer = FindViewById<DrawerLayout>(Resource.Id.drawer_layout);
            drawer.CloseDrawer(GravityCompat.Start);
            return true;
        }
    }
}