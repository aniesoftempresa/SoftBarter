using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Models
{
    public class CreateTradeDto
    {
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
        public string? ImageUrls { get; set; }

        [StringLength(100)]
        public string? Condition { get; set; }
    }

    public class UpdateTradeDto
    {
        [StringLength(200)]
        public string? Title { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? ItemOffered { get; set; }

        [StringLength(100)]
        public string? ItemSought { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? EstimatedValue { get; set; }

        public bool? IsNegotiable { get; set; }

        public DateTime? ExpiryDate { get; set; }

        [StringLength(500)]
        public string? ImageUrls { get; set; }

        [StringLength(100)]
        public string? Condition { get; set; }
    }

    public class CreateOfferDto
    {
        [Required]
        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;

        [StringLength(100)]
        public string? ItemOffered { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? MonetaryOffer { get; set; }
    }

    public class RespondToOfferDto
    {
        [Required]
        public bool Accept { get; set; }

        [StringLength(500)]
        public string? ResponseMessage { get; set; }
    }

    public class TradeSearchDto
    {
        public string? Category { get; set; }
        public string? Location { get; set; }
        public string? ItemSought { get; set; }
        public string? ItemOffered { get; set; }
        public decimal? MinValue { get; set; }
        public decimal? MaxValue { get; set; }
        public bool? IsNegotiable { get; set; }
        public string? Condition { get; set; }
        public string? SearchTerm { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class TradeDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ItemOffered { get; set; } = string.Empty;
        public string ItemSought { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Location { get; set; }
        public decimal? EstimatedValue { get; set; }
        public bool IsNegotiable { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? ImageUrls { get; set; }
        public string? Condition { get; set; }
        public int ViewCount { get; set; }
        public TradeStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserId { get; set; }
        public UserProfileDto User { get; set; } = null!;
        public List<OfferDto> Offers { get; set; } = new List<OfferDto>();
    }

    public class OfferDto
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? ItemOffered { get; set; }
        public decimal? MonetaryOffer { get; set; }
        public OfferStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ResponseDate { get; set; }
        public string? ResponseMessage { get; set; }
        public int OfferorId { get; set; }
        public UserProfileDto Offeror { get; set; } = null!;
    }

    public class TransactionDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TransactionStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string? CompletionNotes { get; set; }
        public int? TraderRating { get; set; }
        public int? OfferorRating { get; set; }
        public string? TraderReview { get; set; }
        public string? OfferorReview { get; set; }
        public TradeDetailDto Trade { get; set; } = null!;
        public OfferDto AcceptedOffer { get; set; } = null!;
        public UserProfileDto Trader { get; set; } = null!;
        public UserProfileDto Offeror { get; set; } = null!;
    }
}