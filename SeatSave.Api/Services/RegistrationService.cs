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



        public bool CanUserRegister(UserModel userModel, out string? message)
        {
            message = "";
            bool isUserTypeInformationValid = userModel.UserType switch
            {
                Student.UserType => ((Student)userModel).IsValid(out message),
                Faculty.UserType => ((Faculty)userModel).IsValid(),
                Staff.UserType => ((Staff)userModel).IsValid(),
                _ => false,
            };
            if (!isUserTypeInformationValid)
            {
                return false;
            }

            var isEmailValid = IsEmailValid(userModel.Email);
            if (!isEmailValid)
            {
                message = "There is something wrong with the email";
                return false;
            }

            var isPasswordValid = ValidatePassword(userModel.Password);
            if (!isPasswordValid)
            {
                message = "There is something wrong with the password";
                return false;
            }

            message = null;
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
            return users.Any(e => e.Email == email);
        }

        private bool ValidatePassword(string password)
        {
            return password.Length >= 5;
        }
    }
}
