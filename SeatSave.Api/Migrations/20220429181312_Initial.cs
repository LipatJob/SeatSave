using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.Api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Seat",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Seat",
                keyColumn: "Id",
                keyValue: 1,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "Seat",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Active", "Type" },
                values: new object[] { false, "2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Active",
                table: "Seat",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "Seat",
                keyColumn: "Id",
                keyValue: 1,
                column: "Active",
                value: "true");

            migrationBuilder.UpdateData(
                table: "Seat",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Active", "Type" },
                values: new object[] { "true", "1" });
        }
    }
}
