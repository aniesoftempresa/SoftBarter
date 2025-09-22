using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoftBarter.API.Data;
using SoftBarter.API.Models;

namespace SoftBarter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TradesController : ControllerBase
    {
        private readonly SoftBarterDbContext _context;

        public TradesController(SoftBarterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TradeDetailDto>>> GetTrades([FromQuery] TradeSearchDto searchDto)
        {
            var query = _context.Trades
                .Include(t => t.User)
                .Include(t => t.Offers.Where(o => o.Status == OfferStatus.Pending))
                .ThenInclude(o => o.Offeror)
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(searchDto.Category))
                query = query.Where(t => t.Category == searchDto.Category);

            if (!string.IsNullOrEmpty(searchDto.Location))
                query = query.Where(t => t.Location!.Contains(searchDto.Location));

            if (!string.IsNullOrEmpty(searchDto.ItemSought))
                query = query.Where(t => t.ItemSought.Contains(searchDto.ItemSought));

            if (!string.IsNullOrEmpty(searchDto.ItemOffered))
                query = query.Where(t => t.ItemOffered.Contains(searchDto.ItemOffered));

            if (searchDto.MinValue.HasValue)
                query = query.Where(t => t.EstimatedValue >= searchDto.MinValue);

            if (searchDto.MaxValue.HasValue)
                query = query.Where(t => t.EstimatedValue <= searchDto.MaxValue);

            if (searchDto.IsNegotiable.HasValue)
                query = query.Where(t => t.IsNegotiable == searchDto.IsNegotiable);

            if (!string.IsNullOrEmpty(searchDto.Condition))
                query = query.Where(t => t.Condition == searchDto.Condition);

            if (!string.IsNullOrEmpty(searchDto.SearchTerm))
            {
                query = query.Where(t => t.Title.Contains(searchDto.SearchTerm) ||
                                        t.Description.Contains(searchDto.SearchTerm) ||
                                        t.ItemOffered.Contains(searchDto.SearchTerm) ||
                                        t.ItemSought.Contains(searchDto.SearchTerm));
            }

            // Only show active trades by default
            query = query.Where(t => t.Status == TradeStatus.Active);

            // Pagination
            var totalCount = await query.CountAsync();
            var trades = await query
                .OrderByDescending(t => t.CreatedAt)
                .Skip((searchDto.Page - 1) * searchDto.PageSize)
                .Take(searchDto.PageSize)
                .Select(t => new TradeDetailDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    ItemOffered = t.ItemOffered,
                    ItemSought = t.ItemSought,
                    Category = t.Category,
                    Location = t.Location,
                    EstimatedValue = t.EstimatedValue,
                    IsNegotiable = t.IsNegotiable,
                    ExpiryDate = t.ExpiryDate,
                    ImageUrls = t.ImageUrls,
                    Condition = t.Condition,
                    ViewCount = t.ViewCount,
                    Status = t.Status,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    UserId = t.UserId,
                    User = new UserProfileDto
                    {
                        Id = t.User.Id,
                        Name = t.User.Name,
                        Email = t.User.Email,
                        Bio = t.User.Bio,
                        CreatedAt = t.User.CreatedAt,
                        UpdatedAt = t.User.UpdatedAt
                    },
                    Offers = t.Offers.Select(o => new OfferDto
                    {
                        Id = o.Id,
                        Message = o.Message,
                        ItemOffered = o.ItemOffered,
                        MonetaryOffer = o.MonetaryOffer,
                        Status = o.Status,
                        CreatedAt = o.CreatedAt,
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
                    }).ToList()
                })
                .ToListAsync();

            return Ok(new
            {
                trades,
                totalCount,
                page = searchDto.Page,
                pageSize = searchDto.PageSize,
                totalPages = (int)Math.Ceiling((double)totalCount / searchDto.PageSize)
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TradeDetailDto>> GetTrade(int id)
        {
            var trade = await _context.Trades
                .Include(t => t.User)
                .Include(t => t.Offers)
                .ThenInclude(o => o.Offeror)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trade == null)
            {
                return NotFound();
            }

            // Increment view count
            trade.ViewCount++;
            await _context.SaveChangesAsync();

            var tradeDto = new TradeDetailDto
            {
                Id = trade.Id,
                Title = trade.Title,
                Description = trade.Description,
                ItemOffered = trade.ItemOffered,
                ItemSought = trade.ItemSought,
                Category = trade.Category,
                Location = trade.Location,
                EstimatedValue = trade.EstimatedValue,
                IsNegotiable = trade.IsNegotiable,
                ExpiryDate = trade.ExpiryDate,
                ImageUrls = trade.ImageUrls,
                Condition = trade.Condition,
                ViewCount = trade.ViewCount,
                Status = trade.Status,
                CreatedAt = trade.CreatedAt,
                UpdatedAt = trade.UpdatedAt,
                UserId = trade.UserId,
                User = new UserProfileDto
                {
                    Id = trade.User.Id,
                    Name = trade.User.Name,
                    Email = trade.User.Email,
                    Bio = trade.User.Bio,
                    CreatedAt = trade.User.CreatedAt,
                    UpdatedAt = trade.User.UpdatedAt
                },
                Offers = trade.Offers.Select(o => new OfferDto
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
                }).ToList()
            };

            return Ok(tradeDto);
        }

        [HttpGet("my-trades")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<TradeDetailDto>>> GetMyTrades()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var trades = await _context.Trades
                .Include(t => t.User)
                .Include(t => t.Offers)
                .ThenInclude(o => o.Offeror)
                .Where(t => t.UserId == userId)
                .Select(t => new TradeDetailDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    ItemOffered = t.ItemOffered,
                    ItemSought = t.ItemSought,
                    Category = t.Category,
                    Location = t.Location,
                    EstimatedValue = t.EstimatedValue,
                    IsNegotiable = t.IsNegotiable,
                    ExpiryDate = t.ExpiryDate,
                    ImageUrls = t.ImageUrls,
                    Condition = t.Condition,
                    ViewCount = t.ViewCount,
                    Status = t.Status,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    UserId = t.UserId,
                    User = new UserProfileDto
                    {
                        Id = t.User.Id,
                        Name = t.User.Name,
                        Email = t.User.Email,
                        Bio = t.User.Bio,
                        CreatedAt = t.User.CreatedAt,
                        UpdatedAt = t.User.UpdatedAt
                    },
                    Offers = t.Offers.Select(o => new OfferDto
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
                    }).ToList()
                })
                .ToListAsync();

            return Ok(trades);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Trade>>> GetActiveTrades()
        {
            return await _context.Trades
                .Include(t => t.User)
                .Where(t => t.Status == TradeStatus.Active)
                .ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TradeDetailDto>> PostTrade(CreateTradeDto createTradeDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var trade = new Trade
            {
                Title = createTradeDto.Title,
                Description = createTradeDto.Description,
                ItemOffered = createTradeDto.ItemOffered,
                ItemSought = createTradeDto.ItemSought,
                Category = createTradeDto.Category,
                Location = createTradeDto.Location,
                EstimatedValue = createTradeDto.EstimatedValue,
                IsNegotiable = createTradeDto.IsNegotiable,
                ExpiryDate = createTradeDto.ExpiryDate,
                ImageUrls = createTradeDto.ImageUrls,
                Condition = createTradeDto.Condition,
                Status = TradeStatus.Active,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Trades.Add(trade);
            await _context.SaveChangesAsync();

            // Load the created trade with user data
            var createdTrade = await _context.Trades
                .Include(t => t.User)
                .FirstAsync(t => t.Id == trade.Id);

            var tradeDto = new TradeDetailDto
            {
                Id = createdTrade.Id,
                Title = createdTrade.Title,
                Description = createdTrade.Description,
                ItemOffered = createdTrade.ItemOffered,
                ItemSought = createdTrade.ItemSought,
                Category = createdTrade.Category,
                Location = createdTrade.Location,
                EstimatedValue = createdTrade.EstimatedValue,
                IsNegotiable = createdTrade.IsNegotiable,
                ExpiryDate = createdTrade.ExpiryDate,
                ImageUrls = createdTrade.ImageUrls,
                Condition = createdTrade.Condition,
                ViewCount = createdTrade.ViewCount,
                Status = createdTrade.Status,
                CreatedAt = createdTrade.CreatedAt,
                UpdatedAt = createdTrade.UpdatedAt,
                UserId = createdTrade.UserId,
                User = new UserProfileDto
                {
                    Id = createdTrade.User.Id,
                    Name = createdTrade.User.Name,
                    Email = createdTrade.User.Email,
                    Bio = createdTrade.User.Bio,
                    CreatedAt = createdTrade.User.CreatedAt,
                    UpdatedAt = createdTrade.User.UpdatedAt
                },
                Offers = new List<OfferDto>()
            };

            return CreatedAtAction(nameof(GetTrade), new { id = trade.Id }, tradeDto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTrade(int id, UpdateTradeDto updateTradeDto)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var trade = await _context.Trades.FirstOrDefaultAsync(t => t.Id == id);
            if (trade == null)
            {
                return NotFound();
            }

            if (trade.UserId != userId)
            {
                return Forbid("You can only update your own trades");
            }

            // Update only provided fields
            if (!string.IsNullOrEmpty(updateTradeDto.Title))
                trade.Title = updateTradeDto.Title;
            
            if (!string.IsNullOrEmpty(updateTradeDto.Description))
                trade.Description = updateTradeDto.Description;
            
            if (!string.IsNullOrEmpty(updateTradeDto.ItemOffered))
                trade.ItemOffered = updateTradeDto.ItemOffered;
            
            if (!string.IsNullOrEmpty(updateTradeDto.ItemSought))
                trade.ItemSought = updateTradeDto.ItemSought;
            
            if (updateTradeDto.Category != null)
                trade.Category = updateTradeDto.Category;
            
            if (updateTradeDto.Location != null)
                trade.Location = updateTradeDto.Location;
            
            if (updateTradeDto.EstimatedValue.HasValue)
                trade.EstimatedValue = updateTradeDto.EstimatedValue;
            
            if (updateTradeDto.IsNegotiable.HasValue)
                trade.IsNegotiable = updateTradeDto.IsNegotiable.Value;
            
            if (updateTradeDto.ExpiryDate.HasValue)
                trade.ExpiryDate = updateTradeDto.ExpiryDate;
            
            if (updateTradeDto.ImageUrls != null)
                trade.ImageUrls = updateTradeDto.ImageUrls;
            
            if (updateTradeDto.Condition != null)
                trade.Condition = updateTradeDto.Condition;

            trade.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TradeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTrade(int id)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized();
            }

            var trade = await _context.Trades.FirstOrDefaultAsync(t => t.Id == id);
            if (trade == null)
            {
                return NotFound();
            }

            if (trade.UserId != userId)
            {
                return Forbid("You can only delete your own trades");
            }

            // Check if trade has active offers or transactions
            var hasActiveOffers = await _context.Offers
                .AnyAsync(o => o.TradeId == id && o.Status == OfferStatus.Pending);
            
            var hasTransactions = await _context.Transactions
                .AnyAsync(t => t.TradeId == id);

            if (hasActiveOffers || hasTransactions)
            {
                // Instead of deleting, mark as cancelled
                trade.Status = TradeStatus.Cancelled;
                trade.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Trade cancelled due to active offers/transactions" });
            }

            _context.Trades.Remove(trade);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TradeExists(int id)
        {
            return _context.Trades.Any(e => e.Id == id);
        }
    }
}