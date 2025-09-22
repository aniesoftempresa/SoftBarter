using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        public TransactionStatus Status { get; set; } = TransactionStatus.InProgress;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? CompletedAt { get; set; }

        [StringLength(1000)]
        public string? CompletionNotes { get; set; }

        // Rating system (1-5 stars)
        public int? TraderRating { get; set; }
        public int? OfferorRating { get; set; }

        [StringLength(500)]
        public string? TraderReview { get; set; }

        [StringLength(500)]
        public string? OfferorReview { get; set; }

        // Foreign keys
        public int TradeId { get; set; }
        public int AcceptedOfferId { get; set; }
        public int TraderId { get; set; }
        public int OfferorId { get; set; }

        // Navigation properties
        public Trade Trade { get; set; } = null!;
        public Offer AcceptedOffer { get; set; } = null!;
        public User Trader { get; set; } = null!;
        public User Offeror { get; set; } = null!;
    }

    public enum TransactionStatus
    {
        InProgress,
        Completed,
        Cancelled,
        Disputed
    }
}