﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SeatSave.EF;

#nullable disable

namespace SeatSave.Api.Migrations
{
    [DbContext(typeof(SeatSaveContext))]
    [Migration("20220427140113_UpdatedPeriodUnique")]
    partial class UpdatedPeriodUnique
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.4");

            modelBuilder.Entity("SeatSave.Core.Schedule.Period", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("RegularDayOfWeekAvailabilityDayOfWeek")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("SpecificDateAvailabilityDate")
                        .HasColumnType("Date");

                    b.Property<TimeSpan>("TimeEnd")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("TimeStart")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.HasIndex("RegularDayOfWeekAvailabilityDayOfWeek");

                    b.HasIndex("SpecificDateAvailabilityDate");

                    b.HasIndex("TimeStart", "TimeEnd")
                        .IsUnique();

                    b.ToTable("Period");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", b =>
                {
                    b.Property<int>("DayOfWeek")
                        .HasColumnType("INTEGER");

                    b.HasKey("DayOfWeek");

                    b.ToTable("RegularDayOfWeekAvailability");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.SpecificDateAvailability", b =>
                {
                    b.Property<DateTime>("Date")
                        .HasColumnType("Date");

                    b.HasKey("Date");

                    b.ToTable("SpecificDayAvailability");
                });

            modelBuilder.Entity("SeatSave.Core.Seat.SeatModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Active")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Seat");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Active = "true",
                            Description = "description description",
                            Name = "ABC",
                            Type = "1"
                        },
                        new
                        {
                            Id = 2,
                            Active = "true",
                            Description = "description2 description2",
                            Name = "DEF",
                            Type = "1"
                        });
                });

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

                    b.Property<string>("FacultyOffice")
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
                            Password = "1234567",
                            UserGroup = "Librarian",
                            UserType = "Librarian"
                        });
                });

            modelBuilder.Entity("SeatSave.Core.User.Staff", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.Property<string>("StaffOffice")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Staff");
                });

            modelBuilder.Entity("SeatSave.Core.User.Student", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.Property<string>("ProgramStrand")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("YearGrade")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("Student");

                    b.HasData(
                        new
                        {
                            Id = 2,
                            Email = "student@gmail.com",
                            FirstName = "Text",
                            LastName = "Account",
                            Password = "1234567",
                            UserGroup = "Visitor",
                            UserType = "Student",
                            ProgramStrand = "CS",
                            YearGrade = "First Year"
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
                            ProgramStrand = "IT",
                            YearGrade = "First Year"
                        });
                });

            modelBuilder.Entity("SeatSave.Core.User.HeadLibrarian", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Librarian");

                    b.HasDiscriminator().HasValue("HeadLibrarian");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.Period", b =>
                {
                    b.HasOne("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", null)
                        .WithMany("Periods")
                        .HasForeignKey("RegularDayOfWeekAvailabilityDayOfWeek");

                    b.HasOne("SeatSave.Core.Schedule.SpecificDateAvailability", null)
                        .WithMany("Periods")
                        .HasForeignKey("SpecificDateAvailabilityDate");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", b =>
                {
                    b.Navigation("Periods");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.SpecificDateAvailability", b =>
                {
                    b.Navigation("Periods");
                });
#pragma warning restore 612, 618
        }
    }
}
