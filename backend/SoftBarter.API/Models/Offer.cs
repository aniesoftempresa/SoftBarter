using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Models
{
    public class Offer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;

        [StringLength(100)]
        public string? ItemOffered { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? MonetaryOffer { get; set; }

        public OfferStatus Status { get; set; } = OfferStatus.Pending;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ResponseDate { get; set; }

        [StringLength(500)]
        public string? ResponseMessage { get; set; }

        // Foreign keys
        public int TradeId { get; set; }
        public int OfferorId { get; set; }

        // Navigation properties
        public Trade Trade { get; set; } = null!;
        public User Offeror { get; set; } = null!;
    }

    public enum OfferStatus
    {
        Pending,
        Accepted,
        Rejected,
        Withdrawn,
        Expired
    }
}