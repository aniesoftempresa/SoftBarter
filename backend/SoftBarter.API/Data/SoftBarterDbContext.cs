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
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

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

            // Configure Offer entity
            modelBuilder.Entity<Offer>(entity =>
            {
                entity.HasOne(o => o.Trade)
                      .WithMany(t => t.Offers)
                      .HasForeignKey(o => o.TradeId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(o => o.Offeror)
                      .WithMany(u => u.Offers)
                      .HasForeignKey(o => o.OfferorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Transaction entity
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasOne(t => t.Trade)
                      .WithMany(tr => tr.Transactions)
                      .HasForeignKey(t => t.TradeId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.AcceptedOffer)
                      .WithMany()
                      .HasForeignKey(t => t.AcceptedOfferId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.Trader)
                      .WithMany(u => u.TradesAsTrader)
                      .HasForeignKey(t => t.TraderId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(t => t.Offeror)
                      .WithMany(u => u.TradesAsOfferor)
                      .HasForeignKey(t => t.OfferorId)
                      .OnDelete(DeleteBehavior.Restrict);
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
                    Category = "Collectibles",
                    Location = "New York, NY",
                    EstimatedValue = 150.00m,
                    IsNegotiable = true,
                    Condition = "Good",
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
                    Category = "Arts & Crafts",
                    Location = "Los Angeles, CA",
                    EstimatedValue = 75.00m,
                    IsNegotiable = true,
                    Condition = "New",
                    Status = TradeStatus.Active,
                    UserId = 2,
                    CreatedAt = now,
                    UpdatedAt = now
                }
            );
        }
    }
}