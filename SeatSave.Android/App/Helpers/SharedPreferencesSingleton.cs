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

namespace SeatSave.Android.App.Helpers
{
    class SharedPreferencesSingleton
    {
        private static ISharedPreferences sharedPreferences { get; set; }

        private SharedPreferencesSingleton()
        {
        }

        public static void Initialize(Context context)
        {
            if (sharedPreferences == null)
            {
                sharedPreferences = context.GetSharedPreferences(context.PackageName, FileCreationMode.Private);
            }
        }

        public static ISharedPreferences Instance => sharedPreferences;
    }
}