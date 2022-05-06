using SeatSave.Core.User;

namespace SeatSave.Api.Services
{
    public class RegistrationService
    {
        IEnumerable<UserModel> users;

        public RegistrationService(IEnumerable<UserModel> users)
        {
            this.users = users;
        }



        public bool CanUserRegister(UserModel userModel)
        {
            bool isUserTypeInformationValid = userModel.UserType switch
            {
                Student.UserType => ((Student)userModel).IsValid(),
                Faculty.UserType => ((Faculty)userModel).IsValid(),
                Staff.UserType => ((Staff)userModel).IsValid(),
                _ => false,
            };
            if (!isUserTypeInformationValid) { return false; }

            var isEmailValid = IsEmailValid(userModel.Email);
            if (!isEmailValid) { return false; }

            var isPasswordValid = ValidatePassword(userModel.Password);
            if (!isPasswordValid) { return false; }


            return true;
        }

        private bool IsEmailValid(string email)
        {
            email = email.ToLower();
            return
                !DoesEmailExist(email) &&
                (email.EndsWith("mcl.edu.ph") || email.EndsWith("live.mcl.edu.ph"));
        }

        public bool DoesEmailExist(string email)
        {
            var user = users.FirstOrDefault(e => e.Email == email);
            return user != null;
        }

        private bool ValidatePassword(string password)
        {
            return password.Length > 5;
        }
    }
}
