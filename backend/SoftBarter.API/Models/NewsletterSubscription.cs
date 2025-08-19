using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Models;

public class NewsletterSubscription
{
    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
}