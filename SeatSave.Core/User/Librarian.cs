﻿namespace SeatSave.Core.User
{
    public class Librarian : UserModel
    {
        public static string UserType = "Librarian";

        public Librarian() : base(UserType)
        {
        }

        protected Librarian(string UserType) : base(UserType)
        {
        }
    }
}