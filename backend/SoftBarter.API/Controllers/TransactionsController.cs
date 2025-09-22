using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftBarter.API.Data;
using SoftBarter.API.Models;
using System.ComponentModel.DataAnnotations;

namespace SoftBarter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly SoftBarterDbContext _context;

        public TransactionsController(SoftBarterDbContext context)
        {
            _context = context;
        }

        [HttpGet("my-transactions")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetMyTransactions()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var transactions = await _context.Transactions
                .Include(t => t.Trade)
                .ThenInclude(tr => tr.User)
                .Include(t => t.AcceptedOffer)
                .ThenInclude(o => o.Offeror)
                .Include(t => t.Trader)
                .Include(t => t.Offeror)
                .Where(t => t.TraderId == userId || t.OfferorId == userId)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    CreatedAt = t.CreatedAt,
                    CompletedAt = t.CompletedAt,
                    CompletionNotes = t.CompletionNotes,
                    TraderRating = t.TraderRating,
                    OfferorRating = t.OfferorRating,
                    TraderReview = t.TraderReview,
                    OfferorReview = t.OfferorReview,
                    Trade = new TradeDetailDto
                    {
                        Id = t.Trade.Id,
                        Title = t.Trade.Title,
                        Description = t.Trade.Description,
                        ItemOffered = t.Trade.ItemOffered,
                        ItemSought = t.Trade.ItemSought,
                        Category = t.Trade.Category,
                        Location = t.Trade.Location,
                        EstimatedValue = t.Trade.EstimatedValue,
                        IsNegotiable = t.Trade.IsNegotiable,
                        ExpiryDate = t.Trade.ExpiryDate,
                        ImageUrls = t.Trade.ImageUrls,
                        Condition = t.Trade.Condition,
                        ViewCount = t.Trade.ViewCount,
                        Status = t.Trade.Status,
                        CreatedAt = t.Trade.CreatedAt,
                        UpdatedAt = t.Trade.UpdatedAt,
                        UserId = t.Trade.UserId,
                        User = new UserProfileDto
                        {
                            Id = t.Trade.User.Id,
                            Name = t.Trade.User.Name,
                            Email = t.Trade.User.Email,
                            Bio = t.Trade.User.Bio,
                            CreatedAt = t.Trade.User.CreatedAt,
                            UpdatedAt = t.Trade.User.UpdatedAt
                        },
                        Offers = new List<OfferDto>()
                    },
                    AcceptedOffer = new OfferDto
                    {
                        Id = t.AcceptedOffer.Id,
                        Message = t.AcceptedOffer.Message,
                        ItemOffered = t.AcceptedOffer.ItemOffered,
                        MonetaryOffer = t.AcceptedOffer.MonetaryOffer,
                        Status = t.AcceptedOffer.Status,
                        CreatedAt = t.AcceptedOffer.CreatedAt,
                        ResponseDate = t.AcceptedOffer.ResponseDate,
                        ResponseMessage = t.AcceptedOffer.ResponseMessage,
                        OfferorId = t.AcceptedOffer.OfferorId,
                        Offeror = new UserProfileDto
                        {
                            Id = t.AcceptedOffer.Offeror.Id,
                            Name = t.AcceptedOffer.Offeror.Name,
                            Email = t.AcceptedOffer.Offeror.Email,
                            Bio = t.AcceptedOffer.Offeror.Bio,
                            CreatedAt = t.AcceptedOffer.Offeror.CreatedAt,
                            UpdatedAt = t.AcceptedOffer.Offeror.UpdatedAt
                        }
                    },
                    Trader = new UserProfileDto
                    {
                        Id = t.Trader.Id,
                        Name = t.Trader.Name,
                        Email = t.Trader.Email,
                        Bio = t.Trader.Bio,
                        CreatedAt = t.Trader.CreatedAt,
                        UpdatedAt = t.Trader.UpdatedAt
                    },
                    Offeror = new UserProfileDto
                    {
                        Id = t.Offeror.Id,
                        Name = t.Offeror.Name,
                        Email = t.Offeror.Email,
                        Bio = t.Offeror.Bio,
                        CreatedAt = t.Offeror.CreatedAt,
                        UpdatedAt = t.Offeror.UpdatedAt
                    }
                })
                .ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransaction(int id)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var transaction = await _context.Transactions
                .Include(t => t.Trade)
                .ThenInclude(tr => tr.User)
                .Include(t => t.AcceptedOffer)
                .ThenInclude(o => o.Offeror)
                .Include(t => t.Trader)
                .Include(t => t.Offeror)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
            {
                return NotFound();
            }

            // Only participants can view transaction details
            if (transaction.TraderId != userId && transaction.OfferorId != userId)
            {
                return Forbid();
            }

            var transactionDto = new TransactionDto
            {
                Id = transaction.Id,
                Title = transaction.Title,
                Description = transaction.Description,
                Status = transaction.Status,
                CreatedAt = transaction.CreatedAt,
                CompletedAt = transaction.CompletedAt,
                CompletionNotes = transaction.CompletionNotes,
                TraderRating = transaction.TraderRating,
                OfferorRating = transaction.OfferorRating,
                TraderReview = transaction.TraderReview,
                OfferorReview = transaction.OfferorReview,
                Trade = new TradeDetailDto
                {
                    Id = transaction.Trade.Id,
                    Title = transaction.Trade.Title,
                    Description = transaction.Trade.Description,
                    ItemOffered = transaction.Trade.ItemOffered,
                    ItemSought = transaction.Trade.ItemSought,
                    Category = transaction.Trade.Category,
                    Location = transaction.Trade.Location,
                    EstimatedValue = transaction.Trade.EstimatedValue,
                    IsNegotiable = transaction.Trade.IsNegotiable,
                    ExpiryDate = transaction.Trade.ExpiryDate,
                    ImageUrls = transaction.Trade.ImageUrls,
                    Condition = transaction.Trade.Condition,
                    ViewCount = transaction.Trade.ViewCount,
                    Status = transaction.Trade.Status,
                    CreatedAt = transaction.Trade.CreatedAt,
                    UpdatedAt = transaction.Trade.UpdatedAt,
                    UserId = transaction.Trade.UserId,
                    User = new UserProfileDto
                    {
                        Id = transaction.Trade.User.Id,
                        Name = transaction.Trade.User.Name,
                        Email = transaction.Trade.User.Email,
                        Bio = transaction.Trade.User.Bio,
                        CreatedAt = transaction.Trade.User.CreatedAt,
                        UpdatedAt = transaction.Trade.User.UpdatedAt
                    },
                    Offers = new List<OfferDto>()
                },
                AcceptedOffer = new OfferDto
                {
                    Id = transaction.AcceptedOffer.Id,
                    Message = transaction.AcceptedOffer.Message,
                    ItemOffered = transaction.AcceptedOffer.ItemOffered,
                    MonetaryOffer = transaction.AcceptedOffer.MonetaryOffer,
                    Status = transaction.AcceptedOffer.Status,
                    CreatedAt = transaction.AcceptedOffer.CreatedAt,
                    ResponseDate = transaction.AcceptedOffer.ResponseDate,
                    ResponseMessage = transaction.AcceptedOffer.ResponseMessage,
                    OfferorId = transaction.AcceptedOffer.OfferorId,
                    Offeror = new UserProfileDto
                    {
                        Id = transaction.AcceptedOffer.Offeror.Id,
                        Name = transaction.AcceptedOffer.Offeror.Name,
                        Email = transaction.AcceptedOffer.Offeror.Email,
                        Bio = transaction.AcceptedOffer.Offeror.Bio,
                        CreatedAt = transaction.AcceptedOffer.Offeror.CreatedAt,
                        UpdatedAt = transaction.AcceptedOffer.Offeror.UpdatedAt
                    }
                },
                Trader = new UserProfileDto
                {
                    Id = transaction.Trader.Id,
                    Name = transaction.Trader.Name,
                    Email = transaction.Trader.Email,
                    Bio = transaction.Trader.Bio,
                    CreatedAt = transaction.Trader.CreatedAt,
                    UpdatedAt = transaction.Trader.UpdatedAt
                },
                Offeror = new UserProfileDto
                {
                    Id = transaction.Offeror.Id,
                    Name = transaction.Offeror.Name,
                    Email = transaction.Offeror.Email,
                    Bio = transaction.Offeror.Bio,
                    CreatedAt = transaction.Offeror.CreatedAt,
                    UpdatedAt = transaction.Offeror.UpdatedAt
                }
            };

            return Ok(transactionDto);
        }

        [HttpPost("{id}/complete")]
        public async Task<ActionResult> CompleteTransaction(int id, CompleteTransactionDto completeDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var transaction = await _context.Transactions
                .Include(t => t.Trade)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
            {
                return NotFound();
            }

            // Only participants can complete transaction
            if (transaction.TraderId != userId && transaction.OfferorId != userId)
            {
                return Forbid();
            }

            if (transaction.Status != TransactionStatus.InProgress)
            {
                return BadRequest(new { message = "Can only complete transactions that are in progress" });
            }

            transaction.Status = TransactionStatus.Completed;
            transaction.CompletedAt = DateTime.UtcNow;
            transaction.CompletionNotes = completeDto.CompletionNotes;
            transaction.UpdatedAt = DateTime.UtcNow;

            // Update trade status
            transaction.Trade.Status = TradeStatus.Completed;
            transaction.Trade.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Transaction completed successfully" });
        }

        [HttpPost("{id}/rate")]
        public async Task<ActionResult> RateTransaction(int id, RateTransactionDto rateDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == id);
            if (transaction == null)
            {
                return NotFound();
            }

            // Only completed transactions can be rated
            if (transaction.Status != TransactionStatus.Completed)
            {
                return BadRequest(new { message = "Can only rate completed transactions" });
            }

            // Only participants can rate
            if (transaction.TraderId != userId && transaction.OfferorId != userId)
            {
                return Forbid();
            }

            // Check rating range
            if (rateDto.Rating < 1 || rateDto.Rating > 5)
            {
                return BadRequest(new { message = "Rating must be between 1 and 5" });
            }

            if (transaction.TraderId == userId)
            {
                if (transaction.TraderRating.HasValue)
                {
                    return BadRequest(new { message = "You have already rated this transaction" });
                }
                
                transaction.TraderRating = rateDto.Rating;
                transaction.TraderReview = rateDto.Review;
            }
            else if (transaction.OfferorId == userId)
            {
                if (transaction.OfferorRating.HasValue)
                {
                    return BadRequest(new { message = "You have already rated this transaction" });
                }
                
                transaction.OfferorRating = rateDto.Rating;
                transaction.OfferorReview = rateDto.Review;
            }

            transaction.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Rating submitted successfully" });
        }

        [HttpPost("{id}/cancel")]
        public async Task<ActionResult> CancelTransaction(int id, CancelTransactionDto cancelDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var transaction = await _context.Transactions
                .Include(t => t.Trade)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
            {
                return NotFound();
            }

            // Only participants can cancel transaction
            if (transaction.TraderId != userId && transaction.OfferorId != userId)
            {
                return Forbid();
            }

            if (transaction.Status != TransactionStatus.InProgress)
            {
                return BadRequest(new { message = "Can only cancel transactions that are in progress" });
            }

            transaction.Status = TransactionStatus.Cancelled;
            transaction.CompletionNotes = cancelDto.Reason;
            transaction.UpdatedAt = DateTime.UtcNow;

            // Reactivate the trade
            transaction.Trade.Status = TradeStatus.Active;
            transaction.Trade.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Transaction cancelled successfully" });
        }
    }

    public class CompleteTransactionDto
    {
        [StringLength(1000)]
        public string? CompletionNotes { get; set; }
    }

    public class RateTransactionDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }

        [StringLength(500)]
        public string? Review { get; set; }
    }

    public class CancelTransactionDto
    {
        [Required]
        [StringLength(500)]
        public string Reason { get; set; } = string.Empty;
    }
}