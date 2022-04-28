using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class UpdatedPeriodUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Period_TimeStart_TimeEnd",
                table: "Period",
                columns: new[] { "TimeStart", "TimeEnd" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Period_TimeStart_TimeEnd",
                table: "Period");
        }
    }
}
