﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SeatSave.EF;

#nullable disable

namespace SeatSave.Api.Migrations
{
    [DbContext(typeof(SeatSaveContext))]
    partial class SeatSaveContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.4");

            modelBuilder.Entity("SeatSave.Core.Booking.BookingModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("BookingCode")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("BookingDate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("FacultyId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PeriodId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SeatId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("StaffId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Status")
                        .HasColumnType("TEXT");

                    b.Property<int>("StatusHistoryId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("StudentId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("FacultyId");

                    b.HasIndex("PeriodId");

                    b.HasIndex("SeatId");

                    b.HasIndex("StaffId");

                    b.HasIndex("StatusHistoryId");

                    b.HasIndex("StudentId");

                    b.ToTable("Bookings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BookingCode = "1234",
                            BookingDate = new DateOnly(2022, 4, 28),
                            PeriodId = 1,
                            SeatId = 1,
                            Status = "Pending",
                            StatusHistoryId = 1
                        });
                });

            modelBuilder.Entity("SeatSave.Core.Booking.StatusHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DateTimeCanceled")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateTimeCheckedIn")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateTimeCheckedOut")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTimeCreated")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("StatusHistory");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateTimeCreated = new DateTime(2022, 4, 28, 18, 49, 52, 418, DateTimeKind.Local).AddTicks(4834)
                        });
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.Period", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("RegularDayOfWeekAvailabilityDayOfWeek")
                        .HasColumnType("INTEGER");

                    b.Property<DateOnly?>("SpecificDateAvailabilityDate")
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

                    b.ToTable("Periods");

                    b.HasData(
                        new
                        {
                            id = 1,
                            TimeEnd = new TimeSpan(0, 6, 30, 0, 0),
                            TimeStart = new TimeSpan(0, 5, 0, 0, 0)
                        },
                        new
                        {
                            id = 2,
                            TimeEnd = new TimeSpan(0, 8, 0, 0, 0),
                            TimeStart = new TimeSpan(0, 6, 30, 0, 0)
                        },
                        new
                        {
                            id = 3,
                            TimeEnd = new TimeSpan(0, 9, 30, 0, 0),
                            TimeStart = new TimeSpan(0, 8, 0, 0, 0)
                        },
                        new
                        {
                            id = 4,
                            TimeEnd = new TimeSpan(0, 11, 0, 0, 0),
                            TimeStart = new TimeSpan(0, 9, 30, 0, 0)
                        },
                        new
                        {
                            id = 5,
                            TimeEnd = new TimeSpan(0, 12, 30, 0, 0),
                            TimeStart = new TimeSpan(0, 11, 0, 0, 0)
                        },
                        new
                        {
                            id = 6,
                            TimeEnd = new TimeSpan(0, 14, 0, 0, 0),
                            TimeStart = new TimeSpan(0, 12, 30, 0, 0)
                        },
                        new
                        {
                            id = 7,
                            TimeEnd = new TimeSpan(0, 15, 30, 0, 0),
                            TimeStart = new TimeSpan(0, 14, 0, 0, 0)
                        },
                        new
                        {
                            id = 8,
                            TimeEnd = new TimeSpan(0, 17, 0, 0, 0),
                            TimeStart = new TimeSpan(0, 15, 30, 0, 0)
                        });
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", b =>
                {
                    b.Property<int>("DayOfWeek")
                        .HasColumnType("INTEGER");

                    b.HasKey("DayOfWeek");

                    b.ToTable("RegularDayOfWeekAvailability");

                    b.HasData(
                        new
                        {
                            DayOfWeek = 1
                        },
                        new
                        {
                            DayOfWeek = 2
                        },
                        new
                        {
                            DayOfWeek = 3
                        },
                        new
                        {
                            DayOfWeek = 4
                        },
                        new
                        {
                            DayOfWeek = 5
                        },
                        new
                        {
                            DayOfWeek = 6
                        },
                        new
                        {
                            DayOfWeek = 0
                        });
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.SpecificDateAvailability", b =>
                {
                    b.Property<DateOnly>("Date")
                        .HasColumnType("Date");

                    b.HasKey("Date");

                    b.ToTable("SpecificDayAvailability");

                    b.HasData(
                        new
                        {
                            Date = new DateOnly(2024, 4, 4)
                        });
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

            modelBuilder.Entity("SeatSave.Core.Booking.BookingModel", b =>
                {
                    b.HasOne("SeatSave.Core.User.Faculty", null)
                        .WithMany("ListOfBookings")
                        .HasForeignKey("FacultyId");

                    b.HasOne("SeatSave.Core.Schedule.Period", "Period")
                        .WithMany()
                        .HasForeignKey("PeriodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.Seat.SeatModel", "Seat")
                        .WithMany()
                        .HasForeignKey("SeatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.User.Staff", null)
                        .WithMany("ListOfBookings")
                        .HasForeignKey("StaffId");

                    b.HasOne("SeatSave.Core.Booking.StatusHistory", "StatusHistory")
                        .WithMany()
                        .HasForeignKey("StatusHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.User.Student", null)
                        .WithMany("ListOfBookings")
                        .HasForeignKey("StudentId");

                    b.Navigation("Period");

                    b.Navigation("Seat");

                    b.Navigation("StatusHistory");
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

            modelBuilder.Entity("SeatSave.Core.User.Faculty", b =>
                {
                    b.Navigation("ListOfBookings");
                });

            modelBuilder.Entity("SeatSave.Core.User.Staff", b =>
                {
                    b.Navigation("ListOfBookings");
                });

            modelBuilder.Entity("SeatSave.Core.User.Student", b =>
                {
                    b.Navigation("ListOfBookings");
                });
#pragma warning restore 612, 618
        }
    }
}
