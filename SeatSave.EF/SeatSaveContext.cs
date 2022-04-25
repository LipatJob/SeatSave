﻿using Microsoft.EntityFrameworkCore;
using SeatSave.Core.User;

namespace SeatSave.EF
{
    public class SeatSaveContext : DbContext
    {
        public SeatSaveContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<Faculty> FacultyMembers { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<HeadLibrarian> HeadLibrarians { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Librarian>().HasData(
                new Librarian
                {
                    Id = 1,
                    Email = "librarian@gmail.com",
                    FirstName = "Text",
                    LastName = "Account",
                    Password = "1234567"
                });
            modelBuilder.Entity<Student>().HasData(
               new Student
               {
                   Id = 2,
                   Email = "student@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "1234567",
                   ProgramStrand = "CS",
                   YearGrade = "First Year",
               },
               new Student
               {
                   Id = 3,
                   Email = "another_student@gmail.com",
                   FirstName = "Text",
                   LastName = "Account",
                   Password = "password",
                   ProgramStrand = "IT",
                   YearGrade = "First Year",
               });
        }
    }
}