using Microsoft.AspNetCore.Mvc;
using SoftBarter.API.Models;

namespace SoftBarter.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;

    public ContactController(ILogger<ContactController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public IActionResult SubmitContact([FromBody] ContactRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // For now, just log the contact request
        // In a real application, this would save to database or send email
        _logger.LogInformation("Contact form submission received from {Email}: {Name} - {Message}", 
            request.Email, request.Name, request.Message);

        // Simple response
        return Ok(new { 
            Message = "Contact form submitted successfully", 
            SubmittedAt = request.SubmittedAt 
        });
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok(new { Message = "Contact endpoint is working", Timestamp = DateTime.UtcNow });
    }
}