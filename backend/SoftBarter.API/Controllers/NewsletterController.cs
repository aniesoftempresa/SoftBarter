using Microsoft.AspNetCore.Mvc;
using SoftBarter.API.Models;

namespace SoftBarter.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly ILogger<NewsletterController> _logger;
    private static readonly List<NewsletterSubscription> _subscriptions = new();

    public NewsletterController(ILogger<NewsletterController> logger)
    {
        _logger = logger;
    }

    [HttpPost("subscribe")]
    public IActionResult Subscribe([FromBody] NewsletterSubscription subscription)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if email already exists
        if (_subscriptions.Any(s => s.Email.Equals(subscription.Email, StringComparison.OrdinalIgnoreCase)))
        {
            return Conflict(new { Message = "Email is already subscribed to newsletter" });
        }

        // Add to in-memory storage (in real app, save to database)
        _subscriptions.Add(subscription);
        
        _logger.LogInformation("Newsletter subscription received from {Email}", subscription.Email);

        return Ok(new { 
            Message = "Successfully subscribed to newsletter", 
            SubscribedAt = subscription.SubscribedAt 
        });
    }

    [HttpGet("subscribers")]
    public IActionResult GetSubscribers()
    {
        return Ok(new { 
            TotalSubscribers = _subscriptions.Count,
            Subscriptions = _subscriptions.Select(s => new { s.Email, s.SubscribedAt }).ToList()
        });
    }
}