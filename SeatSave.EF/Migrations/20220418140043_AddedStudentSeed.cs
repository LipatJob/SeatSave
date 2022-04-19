using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.EF.Migrations
{
    public partial class AddedStudentSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Email",
                value: "librarian@gmail.com");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "Program", "UserType", "Year" },
                values: new object[] { 2, "Student", "student@gmail.com", "Text", "Account", "1234", "CS", "Student", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Email",
                value: "test@gmail.com");
        }
    }
}
