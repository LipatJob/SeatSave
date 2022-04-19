﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SeatSave.EF;

#nullable disable

namespace SeatSave.EF.Migrations
{
    [DbContext(typeof(SeatSaveContext))]
    [Migration("20220419132253_AddedUserGroup")]
    partial class AddedUserGroup
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.4");

            modelBuilder.Entity("SeatSave.Core.User.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserGroup")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("UserModel");
                });

            modelBuilder.Entity("SeatSave.Core.User.Faculty", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Faculty");
                });

            modelBuilder.Entity("SeatSave.Core.User.Librarian", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.HasDiscriminator().HasValue("Librarian");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "librarian@gmail.com",
                            FirstName = "Text",
                            LastName = "Account",
                            Password = "1234",
                            UserGroup = "Librarian",
                            UserType = "Librarian"
                        });
                });

            modelBuilder.Entity("SeatSave.Core.User.Staff", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.Property<string>("Office")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Staff");
                });

            modelBuilder.Entity("SeatSave.Core.User.Student", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.Property<string>("Program")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Year")
                        .HasColumnType("INTEGER");

                    b.HasDiscriminator().HasValue("Student");

                    b.HasData(
                        new
                        {
                            Id = 2,
                            Email = "student@gmail.com",
                            FirstName = "Text",
                            LastName = "Account",
                            Password = "1234",
                            UserGroup = "Visitor",
                            UserType = "Student",
                            Program = "CS",
                            Year = 1
                        },
                        new
                        {
                            Id = 3,
                            Email = "another_student@gmail.com",
                            FirstName = "Text",
                            LastName = "Account",
                            Password = "password",
                            UserGroup = "Visitor",
                            UserType = "Student",
                            Program = "IT",
                            Year = 1
                        });
                });

            modelBuilder.Entity("SeatSave.Core.User.HeadLibrarian", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Librarian");

                    b.HasDiscriminator().HasValue("HeadLibrarian");
                });
#pragma warning restore 612, 618
        }
    }
}
