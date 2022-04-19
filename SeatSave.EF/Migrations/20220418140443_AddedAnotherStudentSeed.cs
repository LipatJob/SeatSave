using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.EF.Migrations
{
    public partial class AddedAnotherStudentSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "Program", "UserType", "Year" },
                values: new object[] { 3, "Student", "another_student@gmail.com", "Text", "Account", "password", "IT", "Student", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
