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
using SeatSave.Android.App.Fragments;
using SeatSave.Android.App.Helpers;
using SeatSave.Android.App.Services;
using static Android.Views.View;

namespace SeatSave.Android
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme.NoActionBar", MainLauncher = true)]
    public class MainActivity : AppCompatActivity, NavigationView.IOnNavigationItemSelectedListener
    {
        private AuthenticationService authenticationService;
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);

            SharedPreferencesSingleton.Initialize(this);
            authenticationService = new AuthenticationService(SharedPreferencesSingleton.Instance);
            if (authenticationService.IsLoggedIn() == false)
            {
                StartBlankActivity(typeof(LoginActivity));
                return;
            }

            SetContentView(Resource.Layout.activity_main);

            AndroidX.AppCompat.Widget.Toolbar toolbar = FindViewById<AndroidX.AppCompat.Widget.Toolbar>(Resource.Id.toolbar);
            SetSupportActionBar(toolbar);
            SupportActionBar.SetDisplayShowTitleEnabled(false);


            var button = FindViewById<Button>(Resource.Id.logout);
            button.Click += (_, __) => LogoutClicked();

            DrawerLayout drawer = FindViewById<DrawerLayout>(Resource.Id.drawer_layout);
            ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this, drawer, toolbar, Resource.String.navigation_drawer_open, Resource.String.navigation_drawer_close);
            drawer.AddDrawerListener(toggle);
            toggle.SyncState();

            NavigationView navigationView = FindViewById<NavigationView>(Resource.Id.nav_view);
            navigationView.SetNavigationItemSelectedListener(this);

            GoToCurrentBookingFragment();
        }

        private void StartBlankActivity(Type type)
        {
            Intent intent = new Intent(this, type);
            intent.AddFlags(ActivityFlags.NewTask);
            intent.AddFlags(ActivityFlags.ClearTask);
            base.StartActivity(intent);
        }

        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
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

        public override bool OnOptionsItemSelected(IMenuItem item)
        {
            int id = item.ItemId;
            if (id == Resource.Id.action_settings)
            {
                return true;
            }

            return base.OnOptionsItemSelected(item);
        }

        public bool OnNavigationItemSelected(IMenuItem item)
        {
            int id = item.ItemId;
            AndroidX.Fragment.App.Fragment fragment = null;

            if (id == Resource.Id.currentBooking)
            {
                fragment = new CurrentBookingFragment();
            }
            else if (id == Resource.Id.createBooking)
            {
                fragment = new CheckCurrentBookingFragment();
            }
            else if (id == Resource.Id.sample)
            {
                StartActivity(new Intent(this, typeof(SampleActivity)));
                return true;
            }
            ChangeFragment(fragment);

            DrawerLayout drawer = FindViewById<DrawerLayout>(Resource.Id.drawer_layout);
            drawer.CloseDrawer(GravityCompat.Start);
            return true;
        }

        public void GoToCreateBookingFragment()
        {
            var fragment = new CheckCurrentBookingFragment();
            ChangeFragment(fragment);
        }

        public void GoToCurrentBookingFragment()
        {
            var fragment = new CurrentBookingFragment();
            ChangeFragment(fragment);
        }

        public void ChangeFragment(AndroidX.Fragment.App.Fragment fragment)
        {
            var fragmentTransaction = SupportFragmentManager.BeginTransaction();
            fragmentTransaction.Replace(Resource.Id.fragmentContainer, fragment);
            fragmentTransaction.AddToBackStack(null);
            fragmentTransaction.Commit();
        }

        private void LogoutClicked()
        {
            authenticationService.Logout();
            StartBlankActivity(typeof(LoginActivity));
        }
    }
}