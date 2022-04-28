using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class SpecificDayDateExample : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SpecificDayAvailability",
                column: "Date",
                value: new DateOnly(2024, 4, 4));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SpecificDayAvailability",
                keyColumn: "Date",
                keyValue: new DateOnly(2024, 4, 4));
        }
    }
}
