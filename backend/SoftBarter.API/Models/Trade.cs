using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Models
{
    public class Trade
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ItemOffered { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ItemSought { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Category { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? EstimatedValue { get; set; }

        public bool IsNegotiable { get; set; } = true;

        public DateTime? ExpiryDate { get; set; }

        [StringLength(500)]
        public string? ImageUrls { get; set; } // JSON array of image URLs

        [StringLength(100)]
        public string? Condition { get; set; } // New, Used, Fair, etc.

        public int ViewCount { get; set; } = 0;

        public TradeStatus Status { get; set; } = TradeStatus.Active;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key
        public int UserId { get; set; }

        // Navigation property
        public User User { get; set; } = null!;
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }

    public enum TradeStatus
    {
        Active,
        Completed,
        Cancelled,
        Expired,
        UnderOffer
    }
}