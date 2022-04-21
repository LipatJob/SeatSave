using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    UserType = table.Column<string>(type: "TEXT", nullable: false),
                    UserGroup = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    FacultyOffice = table.Column<string>(type: "TEXT", nullable: true),
                    StaffOffice = table.Column<string>(type: "TEXT", nullable: true),
                    ProgramStrand = table.Column<string>(type: "TEXT", nullable: true),
                    YearGrade = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "UserGroup", "UserType" },
                values: new object[] { 1, "Librarian", "librarian@gmail.com", "Text", "Account", "1234", "Librarian", "Librarian" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "ProgramStrand", "UserGroup", "UserType", "YearGrade" },
                values: new object[] { 2, "Student", "student@gmail.com", "Text", "Account", "1234", "CS", "Visitor", "Student", "First Year" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "ProgramStrand", "UserGroup", "UserType", "YearGrade" },
                values: new object[] { 3, "Student", "another_student@gmail.com", "Text", "Account", "password", "IT", "Visitor", "Student", "First Year" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
