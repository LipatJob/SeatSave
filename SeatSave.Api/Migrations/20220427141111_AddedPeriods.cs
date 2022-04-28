using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class AddedPeriods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 1, null, null, new TimeSpan(0, 6, 30, 0, 0), new TimeSpan(0, 5, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 2, null, null, new TimeSpan(0, 8, 0, 0, 0), new TimeSpan(0, 6, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 3, null, null, new TimeSpan(0, 9, 30, 0, 0), new TimeSpan(0, 8, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 4, null, null, new TimeSpan(0, 11, 0, 0, 0), new TimeSpan(0, 9, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 5, null, null, new TimeSpan(0, 12, 30, 0, 0), new TimeSpan(0, 11, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 6, null, null, new TimeSpan(0, 14, 0, 0, 0), new TimeSpan(0, 12, 30, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 7, null, null, new TimeSpan(0, 15, 30, 0, 0), new TimeSpan(0, 14, 0, 0, 0) });

            migrationBuilder.InsertData(
                table: "Period",
                columns: new[] { "id", "RegularDayOfWeekAvailabilityDayOfWeek", "SpecificDateAvailabilityDate", "TimeEnd", "TimeStart" },
                values: new object[] { 8, null, null, new TimeSpan(0, 17, 0, 0, 0), new TimeSpan(0, 15, 30, 0, 0) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Period",
                keyColumn: "id",
                keyValue: 8);
        }
    }
}
