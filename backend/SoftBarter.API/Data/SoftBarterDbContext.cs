using Microsoft.EntityFrameworkCore;
using SoftBarter.API.Models;

namespace SoftBarter.API.Data
{
    public class SoftBarterDbContext : DbContext
    {
        public SoftBarterDbContext(DbContextOptions<SoftBarterDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Trade> Trades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Configure Trade entity
            modelBuilder.Entity<Trade>(entity =>
            {
                entity.HasOne(t => t.User)
                      .WithMany(u => u.Trades)
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Seed sample data
            var now = DateTime.UtcNow;
            
            // Default password for seed users: "password123"
            var defaultPasswordHash = BCrypt.Net.BCrypt.HashPassword("password123");
            
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    PasswordHash = defaultPasswordHash,
                    Bio = "Avid trader looking for interesting exchanges.",
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new User
                {
                    Id = 2,
                    Name = "Jane Smith",
                    Email = "jane.smith@example.com",
                    PasswordHash = defaultPasswordHash,
                    Bio = "Collector and trader of vintage items.",
                    CreatedAt = now,
                    UpdatedAt = now
                }
            );

            modelBuilder.Entity<Trade>().HasData(
                new Trade
                {
                    Id = 1,
                    Title = "Vintage Book for Rare Coin",
                    Description = "Trading a first edition vintage book for a rare coin from the 1800s.",
                    ItemOffered = "Vintage Book",
                    ItemSought = "Rare Coin",
                    Status = TradeStatus.Active,
                    UserId = 1,
                    CreatedAt = now,
                    UpdatedAt = now
                },
                new Trade
                {
                    Id = 2,
                    Title = "Handmade Pottery for Art Supplies",
                    Description = "Beautiful handmade pottery in exchange for professional art supplies.",
                    ItemOffered = "Handmade Pottery",
                    ItemSought = "Art Supplies",
                    Status = TradeStatus.Active,
                    UserId = 2,
                    CreatedAt = now,
                    UpdatedAt = now
                }
            );
        }
    }
}