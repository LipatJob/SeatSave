﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
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
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("PeriodRegularDayOfWeekAvailability", b =>
                {
                    b.Property<int>("Periodsid")
                        .HasColumnType("int");

                    b.Property<int>("RegularDayOfWeekAvailabilitiesDayOfWeek")
                        .HasColumnType("int");

                    b.HasKey("Periodsid", "RegularDayOfWeekAvailabilitiesDayOfWeek");

                    b.HasIndex("RegularDayOfWeekAvailabilitiesDayOfWeek");

                    b.ToTable("PeriodRegularDayOfWeekAvailability");
                });

            modelBuilder.Entity("PeriodSpecificDateAvailability", b =>
                {
                    b.Property<int>("Periodsid")
                        .HasColumnType("int");

                    b.Property<DateTime>("SpecificDateAvailabilitiesDate")
                        .HasColumnType("date");

                    b.HasKey("Periodsid", "SpecificDateAvailabilitiesDate");

                    b.HasIndex("SpecificDateAvailabilitiesDate");

                    b.ToTable("PeriodSpecificDateAvailability");
                });

            modelBuilder.Entity("SeatSave.Core.Booking.BookingModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("BookingCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("date");

                    b.Property<int>("PeriodId")
                        .HasColumnType("int");

                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StatusHistoryId")
                        .HasColumnType("int");

                    b.Property<int>("VisitorId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PeriodId");

                    b.HasIndex("SeatId");

                    b.HasIndex("StatusHistoryId");

                    b.HasIndex("VisitorId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("SeatSave.Core.Booking.StatusHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("DateTimeCanceled")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateTimeCheckedIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateTimeCheckedOut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTimeCreated")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("StatusHistory");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.Period", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<TimeSpan>("TimeEnd")
                        .HasColumnType("time");

                    b.Property<TimeSpan>("TimeStart")
                        .HasColumnType("time");

                    b.HasKey("id");

                    b.HasIndex("TimeStart", "TimeEnd")
                        .IsUnique();

                    b.ToTable("Periods");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", b =>
                {
                    b.Property<int>("DayOfWeek")
                        .HasColumnType("int");

                    b.HasKey("DayOfWeek");

                    b.ToTable("RegularDayOfWeekAvailability");
                });

            modelBuilder.Entity("SeatSave.Core.Schedule.SpecificDateAvailability", b =>
                {
                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.HasKey("Date");

                    b.ToTable("SpecificDayAvailability");
                });

            modelBuilder.Entity("SeatSave.Core.Seat.SeatModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PositionX")
                        .HasColumnType("int");

                    b.Property<int>("PositionY")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Width")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("SeatSave.Core.Seat.Table", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<int>("PositionX")
                        .HasColumnType("int");

                    b.Property<int>("PositionY")
                        .HasColumnType("int");

                    b.Property<int>("Width")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Tables");
                });

            modelBuilder.Entity("SeatSave.Core.User.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserGroup")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("UserModel");
                });

            modelBuilder.Entity("SeatSave.Core.User.Librarian", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.HasDiscriminator().HasValue("Librarian");
                });

            modelBuilder.Entity("SeatSave.Core.User.Visitor", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.UserModel");

                    b.HasDiscriminator().HasValue("Visitor");
                });

            modelBuilder.Entity("SeatSave.Core.User.Faculty", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Visitor");

                    b.Property<string>("FacultyOffice")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Faculty");
                });

            modelBuilder.Entity("SeatSave.Core.User.HeadLibrarian", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Librarian");

                    b.HasDiscriminator().HasValue("HeadLibrarian");
                });

            modelBuilder.Entity("SeatSave.Core.User.Staff", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Visitor");

                    b.Property<string>("StaffOffice")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Staff");
                });

            modelBuilder.Entity("SeatSave.Core.User.Student", b =>
                {
                    b.HasBaseType("SeatSave.Core.User.Visitor");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProgramStrand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("YearGrade")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Student");
                });

            modelBuilder.Entity("PeriodRegularDayOfWeekAvailability", b =>
                {
                    b.HasOne("SeatSave.Core.Schedule.Period", null)
                        .WithMany()
                        .HasForeignKey("Periodsid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.Schedule.RegularDayOfWeekAvailability", null)
                        .WithMany()
                        .HasForeignKey("RegularDayOfWeekAvailabilitiesDayOfWeek")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PeriodSpecificDateAvailability", b =>
                {
                    b.HasOne("SeatSave.Core.Schedule.Period", null)
                        .WithMany()
                        .HasForeignKey("Periodsid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.Schedule.SpecificDateAvailability", null)
                        .WithMany()
                        .HasForeignKey("SpecificDateAvailabilitiesDate")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SeatSave.Core.Booking.BookingModel", b =>
                {
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

                    b.HasOne("SeatSave.Core.Booking.StatusHistory", "StatusHistory")
                        .WithMany()
                        .HasForeignKey("StatusHistoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SeatSave.Core.User.Visitor", "VisitorModel")
                        .WithMany("Bookings")
                        .HasForeignKey("VisitorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Period");

                    b.Navigation("Seat");

                    b.Navigation("StatusHistory");

                    b.Navigation("VisitorModel");
                });

            modelBuilder.Entity("SeatSave.Core.User.Visitor", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
