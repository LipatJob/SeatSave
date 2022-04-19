using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatSave.EF.Migrations
{
    public partial class AddedVisitorEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Office",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Office",
                table: "Users");
        }
    }
}
