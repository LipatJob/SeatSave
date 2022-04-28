using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class AddRegularDayOfWeekValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 0);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "RegularDayOfWeekAvailability",
                keyColumn: "DayOfWeek",
                keyValue: 6);
        }
    }
}
