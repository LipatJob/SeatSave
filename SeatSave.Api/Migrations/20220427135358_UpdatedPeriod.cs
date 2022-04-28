using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class UpdatedPeriod : Migration
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
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecificDayAvailability", x => x.Date);
                });

            migrationBuilder.CreateTable(
                name: "Period",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TimeStart = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    TimeEnd = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    RegularDayOfWeekAvailabilityDayOfWeek = table.Column<int>(type: "INTEGER", nullable: true),
                    SpecificDateAvailabilityDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Period", x => x.id);
                    table.ForeignKey(
                        name: "FK_Period_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                        column: x => x.RegularDayOfWeekAvailabilityDayOfWeek,
                        principalTable: "RegularDayOfWeekAvailability",
                        principalColumn: "DayOfWeek");
                    table.ForeignKey(
                        name: "FK_Period_SpecificDayAvailability_SpecificDateAvailabilityDate",
                        column: x => x.SpecificDateAvailabilityDate,
                        principalTable: "SpecificDayAvailability",
                        principalColumn: "Date");
                });

            migrationBuilder.InsertData(
                table: "Seat",
                columns: new[] { "Id", "Active", "Description", "Name", "Type" },
                values: new object[] { 1, "true", "description description", "ABC", "1" });

            migrationBuilder.InsertData(
                table: "Seat",
                columns: new[] { "Id", "Active", "Description", "Name", "Type" },
                values: new object[] { 2, "true", "description2 description2", "DEF", "1" });

            migrationBuilder.CreateIndex(
                name: "IX_Period_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Period",
                column: "RegularDayOfWeekAvailabilityDayOfWeek");

            migrationBuilder.CreateIndex(
                name: "IX_Period_SpecificDateAvailabilityDate",
                table: "Period",
                column: "SpecificDateAvailabilityDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Period");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropTable(
                name: "RegularDayOfWeekAvailability");

            migrationBuilder.DropTable(
                name: "SpecificDayAvailability");
        }
    }
}
