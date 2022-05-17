using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using SeatSave.Api.DTO;
using SeatSave.Core.Booking;

namespace SeatSave.Api.Services
{
    public interface IEmailService
    {
        public void Send(string to, string subject, string html);
        public void SendConfirmationMessage(string email, BookingModel booking);
    }
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration config;

        public EmailService(EmailConfiguration config)
        {
            this.config = config;
        }

        public void Send(string to, string subject, string html)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(config.From));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            using (var smtp = new SmtpClient())
            {
                try
                {
                    smtp.Connect(config.SmtpServer, config.Port, SecureSocketOptions.StartTls);
                    smtp.Authenticate(config.UserName, config.Password);
                    smtp.Send(email);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    smtp.Disconnect(true);
                }

            }
        }

        public void SendConfirmationMessage(string email, BookingModel booking)
        {
            string subject = $"MCL CLIR Boooking on {booking.BookingDate.ToShortDateString()}";
            string body =
                $"Booking Code: {booking.BookingCode} </br>" +
                $"Date: {booking.BookingDate.ToShortDateString()}</br>" +
                $"Seat: {booking.Seat.Id} {booking.Seat.Name}</br>" +
                $"From: {booking.Period.TimeStart.ToShortTimeString()}</br>" +
                $"Until: {booking.Period.TimeEnd.ToShortTimeString()}</br>";
            Send(email, subject, body);
        }
    }


}
