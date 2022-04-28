using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class ModifiedBookings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserModelId",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserModelId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTimeCreated",
                value: new DateTime(2022, 4, 28, 19, 43, 49, 351, DateTimeKind.Local).AddTicks(5543));

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserModelId",
                table: "Bookings",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_UserModelId",
                table: "Bookings",
                column: "UserModelId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_UserModelId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_UserModelId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "Bookings");

            migrationBuilder.UpdateData(
                table: "StatusHistory",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateTimeCreated",
                value: new DateTime(2022, 4, 28, 19, 26, 37, 903, DateTimeKind.Local).AddTicks(4310));
        }
    }
}
