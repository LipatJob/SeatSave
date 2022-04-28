using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class SeededBookings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FacultyId",
                table: "Bookings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "Bookings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StudentId",
                table: "Bookings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.InsertData(
                table: "StatusHistory",
                columns: new[] { "Id", "DateTimeCanceled", "DateTimeCheckedIn", "DateTimeCheckedOut", "DateTimeCreated" },
                values: new object[] { 1, null, null, null, new DateTime(2022, 4, 28, 18, 49, 52, 418, DateTimeKind.Local).AddTicks(4834) });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_FacultyId",
                table: "Bookings",
                column: "FacultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_StaffId",
                table: "Bookings",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_StudentId",
                table: "Bookings",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_FacultyId",
                table: "Bookings",
                column: "FacultyId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_StaffId",
                table: "Bookings",
                column: "StaffId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_StudentId",
                table: "Bookings",
                column: "StudentId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_FacultyId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_StaffId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_StudentId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_FacultyId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_StaffId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_StudentId",
                table: "Bookings");

            migrationBuilder.DeleteData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "FacultyId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Bookings");
        }
    }
}
