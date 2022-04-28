using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class SeedBookingsAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RegularDayOfWeekAvailability",
                columns: table => new
                {
                    DayOfWeek = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegularDayOfWeekAvailability", x => x.DayOfWeek);
                });

            migrationBuilder.CreateTable(
                name: "Seat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Active = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seat", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SpecificDayAvailability",
                columns: table => new
                {
                    Date = table.Column<DateOnly>(type: "Date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecificDayAvailability", x => x.Date);
                });

            migrationBuilder.CreateTable(
                name: "StatusHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DateTimeCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTimeCanceled = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DateTimeCheckedIn = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DateTimeCheckedOut = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatusHistory", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "Periods",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TimeStart = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    TimeEnd = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    RegularDayOfWeekAvailabilityDayOfWeek = table.Column<int>(type: "INTEGER", nullable: true),
                    SpecificDateAvailabilityDate = table.Column<DateOnly>(type: "Date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Periods", x => x.id);
                    table.ForeignKey(
                        name: "FK_Periods_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                        column: x => x.RegularDayOfWeekAvailabilityDayOfWeek,
                        principalTable: "RegularDayOfWeekAvailability",
                        principalColumn: "DayOfWeek");
                    table.ForeignKey(
                        name: "FK_Periods_SpecificDayAvailability_SpecificDateAvailabilityDate",
                        column: x => x.SpecificDateAvailabilityDate,
                        principalTable: "SpecificDayAvailability",
                        principalColumn: "Date");
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BookingCode = table.Column<string>(type: "TEXT", nullable: true),
                    BookingDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    PeriodId = table.Column<int>(type: "INTEGER", nullable: false),
                    SeatId = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: true),
                    StatusHistoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_Periods_PeriodId",
                        column: x => x.PeriodId,
                        principalTable: "Periods",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Seat_SeatId",
                        column: x => x.SeatId,
                        principalTable: "Seat",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_StatusHistory_StatusHistoryId",
                        column: x => x.StatusHistoryId,
                        principalTable: "StatusHistory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 1, null, null, new TimeSpan(0, 6, 30, 0, 0), new TimeSpan(0, 5, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 2, null, null, new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 6, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 3, null, null, new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 8, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 4, null, null, new TimeSpan(0, 11, 0, 0, 0), new TimeSpan(0, 9, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 5, null, null, new TimeSpan(0, 12, 30, 0, 0), new TimeSpan(0, 11, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 6, null, null, new TimeSpan(0, 14, 0, 0, 0), new TimeSpan(0, 12, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 7, null, null, new TimeSpan(0, 15, 30, 0, 0), new TimeSpan(0, 14, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Periods",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 8, null, null, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 15, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 0);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 1);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 2);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 3);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 4);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 5);

            migrationBuilder.InsertData(
                table: "RegularDayOfWeekAvailability",
                column: "DayOfWeek",
                value: 6);

            migrationBuilder.InsertData(
                table: "Seat",
                columns: new[] { "Id", "Active", "Description", "Name", "Type" },
                values: new object[] { 1, "true", "description description", "ABC", "1" });

            migrationBuilder.InsertData(
                table: "Seat",
                columns: new[] { "Id", "Active", "Description", "Name", "Type" },
                values: new object[] { 2, "true", "description2 description2", "DEF", "1" });

            migrationBuilder.InsertData(
                table: "SpecificDayAvailability",
                column: "Date",
                value: new DateOnly(2024, 4, 4));

            migrationBuilder.InsertData(
                table: "StatusHistory",
                columns: new[] { "Id", "DateTimeCanceled", "DateTimeCheckedIn", "DateTimeCheckedOut", "DateTimeCreated" },
                values: new object[] { 1, null, null, null, new DateTime(2022, 4, 28, 17, 55, 48, 534, DateTimeKind.Local).AddTicks(1181) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "UserGroup", "UserType" },
                values: new object[] { 1, "Librarian", "librarian@gmail.com", "Text", "Account", "1234567", "Librarian", "Librarian" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "ProgramStrand", "UserGroup", "UserType", "YearGrade" },
                values: new object[] { 2, "Student", "student@gmail.com", "Text", "Account", "1234567", "CS", "Visitor", "Student", "First Year" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "Password", "ProgramStrand", "UserGroup", "UserType", "YearGrade" },
                values: new object[] { 3, "Student", "another_student@gmail.com", "Text", "Account", "password", "IT", "Visitor", "Student", "First Year" });

            migrationBuilder.InsertData(
                table: "Bookings",
                columns: new[] { "Id", "BookingCode", "BookingDate", "PeriodId", "SeatId", "Status", "StatusHistoryId" },
                values: new object[] { 1, "1234", new DateOnly(2022, 4, 28), 1, 1, "Pending", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_PeriodId",
                table: "Bookings",
                column: "PeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_SeatId",
                table: "Bookings",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_StatusHistoryId",
                table: "Bookings",
                column: "StatusHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Periods_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Periods",
                column: "RegularDayOfWeekAvailabilityDayOfWeek");

            migrationBuilder.CreateIndex(
                name: "IX_Periods_SpecificDateAvailabilityDate",
                table: "Periods",
                column: "SpecificDateAvailabilityDate");

            migrationBuilder.CreateIndex(
                name: "IX_Periods_TimeStart_TimeEnd",
                table: "Periods",
                columns: new[] { "TimeStart", "TimeEnd" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Periods");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropTable(
                name: "StatusHistory");

            migrationBuilder.DropTable(
                name: "RegularDayOfWeekAvailability");

            migrationBuilder.DropTable(
                name: "SpecificDayAvailability");
        }
    }
}
