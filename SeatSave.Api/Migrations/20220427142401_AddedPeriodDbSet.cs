using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class AddedPeriodDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Period_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Period");

            migrationBuilder.DropForeignKey(
                name: "FK_Period_SpecificDayAvailability_SpecificDateAvailabilityDate",
                table: "Period");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Period",
                table: "Period");

            migrationBuilder.RenameTable(
                name: "Period",
                newName: "Periods");

            migrationBuilder.RenameIndex(
                name: "IX_Period_TimeStart_TimeEnd",
                table: "Periods",
                newName: "IX_Periods_TimeStart_TimeEnd");

            migrationBuilder.RenameIndex(
                name: "IX_Period_SpecificDateAvailabilityDate",
                table: "Periods",
                newName: "IX_Periods_SpecificDateAvailabilityDate");

            migrationBuilder.RenameIndex(
                name: "IX_Period_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Periods",
                newName: "IX_Periods_RegularDayOfWeekAvailabilityDayOfWeek");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Periods",
                table: "Periods",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Periods_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Periods",
                column: "RegularDayOfWeekAvailabilityDayOfWeek",
                principalTable: "RegularDayOfWeekAvailability",
                principalColumn: "DayOfWeek");

            migrationBuilder.AddForeignKey(
                name: "FK_Periods_SpecificDayAvailability_SpecificDateAvailabilityDate",
                table: "Periods",
                column: "SpecificDateAvailabilityDate",
                principalTable: "SpecificDayAvailability",
                principalColumn: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Periods_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Periods");

            migrationBuilder.DropForeignKey(
                name: "FK_Periods_SpecificDayAvailability_SpecificDateAvailabilityDate",
                table: "Periods");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Periods",
                table: "Periods");

            migrationBuilder.RenameTable(
                name: "Periods",
                newName: "Period");

            migrationBuilder.RenameIndex(
                name: "IX_Periods_TimeStart_TimeEnd",
                table: "Period",
                newName: "IX_Period_TimeStart_TimeEnd");

            migrationBuilder.RenameIndex(
                name: "IX_Periods_SpecificDateAvailabilityDate",
                table: "Period",
                newName: "IX_Period_SpecificDateAvailabilityDate");

            migrationBuilder.RenameIndex(
                name: "IX_Periods_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Period",
                newName: "IX_Period_RegularDayOfWeekAvailabilityDayOfWeek");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Period",
                table: "Period",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Period_RegularDayOfWeekAvailability_RegularDayOfWeekAvailabilityDayOfWeek",
                table: "Period",
                column: "RegularDayOfWeekAvailabilityDayOfWeek",
                principalTable: "RegularDayOfWeekAvailability",
                principalColumn: "DayOfWeek");

            migrationBuilder.AddForeignKey(
                name: "FK_Period_SpecificDayAvailability_SpecificDateAvailabilityDate",
                table: "Period",
                column: "SpecificDateAvailabilityDate",
                principalTable: "SpecificDayAvailability",
                principalColumn: "Date");
        }
    }
}
