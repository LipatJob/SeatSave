using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class UpdatedBookingsSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_VisitorId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_VisitorId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "VisitorId",
                table: "Bookings");

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PeriodId", "Status" },
                values: new object[] { 3, "Completed" });

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateTimeCheckedIn", "DateTimeCheckedOut", "DateTimeCreated" },
                values: new object[] { new DateTime(2022, 4, 28, 8, 2, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 4, 28, 9, 26, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 4, 27, 17, 11, 29, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "StatusHistory",
                columns: new[] { "Id", "DateTimeCanceled", "DateTimeCheckedIn", "DateTimeCheckedOut", "DateTimeCreated" },
                values: new object[] { 2, null, null, null, new DateTime(2022, 4, 28, 10, 10, 10, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "Bookings",
                columns: new[] { "Id", "BookingCode", "BookingDate", "PeriodId", "SeatId", "Status", "StatusHistoryId", "UserModelId" },
                values: new object[] { 2, "5678", new DateOnly(2022, 4, 29), 5, 2, "Pending", 2, 3 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<int>(
                name: "VisitorId",
                table: "Bookings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PeriodId", "Status" },
                values: new object[] { 1, "Pending" });

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateTimeCheckedIn", "DateTimeCheckedOut", "DateTimeCreated" },
                values: new object[] { null, null, new DateTime(2022, 4, 28, 19, 43, 49, 351, DateTimeKind.Local).AddTicks(5543) });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_VisitorId",
                table: "Bookings",
                column: "VisitorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_VisitorId",
                table: "Bookings",
                column: "VisitorId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
