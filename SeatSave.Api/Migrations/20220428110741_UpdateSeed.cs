using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class UpdateSeed : Migration
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

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTimeCreated",
                value: new DateTime(2022, 4, 28, 19, 7, 40, 700, DateTimeKind.Local).AddTicks(9855));

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

            migrationBuilder.DropColumn(
                name: "FacultyId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Bookings");

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTimeCreated",
                value: new DateTime(2022, 4, 28, 17, 55, 48, 534, DateTimeKind.Local).AddTicks(1181));
        }
    }
}
