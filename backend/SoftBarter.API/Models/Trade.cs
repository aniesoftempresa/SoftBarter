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

        public TradeStatus Status { get; set; } = TradeStatus.Active;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key
        public int UserId { get; set; }

        // Navigation property
        public User User { get; set; } = null!;
    }

    public enum TradeStatus
    {
        Active,
        Completed,
        Cancelled
    }
}