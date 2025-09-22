using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftBarter.API.Data;
using SoftBarter.API.Models;

namespace SoftBarter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OffersController : ControllerBase
    {
        private readonly SoftBarterDbContext _context;

        public OffersController(SoftBarterDbContext context)
        {
            _context = context;
        }

        [HttpGet("trade/{tradeId}")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByTrade(int tradeId)
        {
            var offers = await _context.Offers
                .Include(o => o.Offeror)
                .Where(o => o.TradeId == tradeId)
                .Select(o => new OfferDto
                {
                    Id = o.Id,
                    Message = o.Message,
                    ItemOffered = o.ItemOffered,
                    MonetaryOffer = o.MonetaryOffer,
                    Status = o.Status,
                    CreatedAt = o.CreatedAt,
                    ResponseDate = o.ResponseDate,
                    ResponseMessage = o.ResponseMessage,
                    OfferorId = o.OfferorId,
                    Offeror = new UserProfileDto
                    {
                        Id = o.Offeror.Id,
                        Name = o.Offeror.Name,
                        Email = o.Offeror.Email,
                        Bio = o.Offeror.Bio,
                        CreatedAt = o.Offeror.CreatedAt,
                        UpdatedAt = o.Offeror.UpdatedAt
                    }
                })
                .ToListAsync();

            return Ok(offers);
        }

        [HttpGet("my-offers")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetMyOffers()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var offers = await _context.Offers
                .Include(o => o.Trade)
                .Include(o => o.Offeror)
                .Where(o => o.OfferorId == userId)
                .Select(o => new OfferDto
                {
                    Id = o.Id,
                    Message = o.Message,
                    ItemOffered = o.ItemOffered,
                    MonetaryOffer = o.MonetaryOffer,
                    Status = o.Status,
                    CreatedAt = o.CreatedAt,
                    ResponseDate = o.ResponseDate,
                    ResponseMessage = o.ResponseMessage,
                    OfferorId = o.OfferorId,
                    Offeror = new UserProfileDto
                    {
                        Id = o.Offeror.Id,
                        Name = o.Offeror.Name,
                        Email = o.Offeror.Email,
                        Bio = o.Offeror.Bio,
                        CreatedAt = o.Offeror.CreatedAt,
                        UpdatedAt = o.Offeror.UpdatedAt
                    }
                })
                .ToListAsync();

            return Ok(offers);
        }

        [HttpPost("trade/{tradeId}")]
        public async Task<ActionResult<OfferDto>> CreateOffer(int tradeId, CreateOfferDto createOfferDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            // Check if trade exists and is active
            var trade = await _context.Trades.FirstOrDefaultAsync(t => t.Id == tradeId);
            if (trade == null)
            {
                return NotFound(new { message = "Trade not found" });
            }

            if (trade.Status != TradeStatus.Active)
            {
                return BadRequest(new { message = "Cannot make offers on inactive trades" });
            }

            if (trade.UserId == userId)
            {
                return BadRequest(new { message = "Cannot make an offer on your own trade" });
            }

            // Check if user already has a pending offer on this trade
            var existingOffer = await _context.Offers
                .FirstOrDefaultAsync(o => o.TradeId == tradeId && o.OfferorId == userId && o.Status == OfferStatus.Pending);
            
            if (existingOffer != null)
            {
                return BadRequest(new { message = "You already have a pending offer on this trade" });
            }

            var offer = new Offer
            {
                TradeId = tradeId,
                OfferorId = userId,
                Message = createOfferDto.Message,
                ItemOffered = createOfferDto.ItemOffered,
                MonetaryOffer = createOfferDto.MonetaryOffer,
                Status = OfferStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            // Load the created offer with related data
            var createdOffer = await _context.Offers
                .Include(o => o.Offeror)
                .FirstAsync(o => o.Id == offer.Id);

            var offerDto = new OfferDto
            {
                Id = createdOffer.Id,
                Message = createdOffer.Message,
                ItemOffered = createdOffer.ItemOffered,
                MonetaryOffer = createdOffer.MonetaryOffer,
                Status = createdOffer.Status,
                CreatedAt = createdOffer.CreatedAt,
                ResponseDate = createdOffer.ResponseDate,
                ResponseMessage = createdOffer.ResponseMessage,
                OfferorId = createdOffer.OfferorId,
                Offeror = new UserProfileDto
                {
                    Id = createdOffer.Offeror.Id,
                    Name = createdOffer.Offeror.Name,
                    Email = createdOffer.Offeror.Email,
                    Bio = createdOffer.Offeror.Bio,
                    CreatedAt = createdOffer.Offeror.CreatedAt,
                    UpdatedAt = createdOffer.Offeror.UpdatedAt
                }
            };

            return CreatedAtAction(nameof(GetOffersByTrade), new { tradeId = tradeId }, offerDto);
        }

        [HttpPut("{offerId}/respond")]
        public async Task<ActionResult> RespondToOffer(int offerId, RespondToOfferDto responseDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var offer = await _context.Offers
                .Include(o => o.Trade)
                .FirstOrDefaultAsync(o => o.Id == offerId);

            if (offer == null)
            {
                return NotFound(new { message = "Offer not found" });
            }

            // Only trade owner can respond to offers
            if (offer.Trade.UserId != userId)
            {
                return Forbid("Only the trade owner can respond to offers");
            }

            if (offer.Status != OfferStatus.Pending)
            {
                return BadRequest(new { message = "Can only respond to pending offers" });
            }

            offer.Status = responseDto.Accept ? OfferStatus.Accepted : OfferStatus.Rejected;
            offer.ResponseDate = DateTime.UtcNow;
            offer.ResponseMessage = responseDto.ResponseMessage;
            offer.UpdatedAt = DateTime.UtcNow;

            if (responseDto.Accept)
            {
                // Mark trade as under offer
                offer.Trade.Status = TradeStatus.UnderOffer;
                offer.Trade.UpdatedAt = DateTime.UtcNow;

                // Create transaction
                var transaction = new Transaction
                {
                    Title = $"Transaction for: {offer.Trade.Title}",
                    Description = $"Accepted offer: {offer.Message}",
                    TradeId = offer.TradeId,
                    AcceptedOfferId = offer.Id,
                    TraderId = offer.Trade.UserId,
                    OfferorId = offer.OfferorId,
                    Status = TransactionStatus.InProgress,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Transactions.Add(transaction);

                // Reject all other pending offers for this trade
                var otherOffers = await _context.Offers
                    .Where(o => o.TradeId == offer.TradeId && o.Id != offer.Id && o.Status == OfferStatus.Pending)
                    .ToListAsync();

                foreach (var otherOffer in otherOffers)
                {
                    otherOffer.Status = OfferStatus.Rejected;
                    otherOffer.ResponseDate = DateTime.UtcNow;
                    otherOffer.ResponseMessage = "Trade accepted another offer";
                    otherOffer.UpdatedAt = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = responseDto.Accept ? "Offer accepted" : "Offer rejected" });
        }

        [HttpDelete("{offerId}")]
        public async Task<ActionResult> WithdrawOffer(int offerId)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == offerId);
            if (offer == null)
            {
                return NotFound(new { message = "Offer not found" });
            }

            if (offer.OfferorId != userId)
            {
                return Forbid("Can only withdraw your own offers");
            }

            if (offer.Status != OfferStatus.Pending)
            {
                return BadRequest(new { message = "Can only withdraw pending offers" });
            }

            offer.Status = OfferStatus.Withdrawn;
            offer.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Offer withdrawn" });
        }
    }
}