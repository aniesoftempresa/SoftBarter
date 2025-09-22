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
        public async Task<ActionResult<IEnumerable<Trade>>> GetTrades()
        {
            return await _context.Trades.Include(t => t.User).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trade>> GetTrade(int id)
        {
            var trade = await _context.Trades.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);

            if (trade == null)
            {
                return NotFound();
            }

            return trade;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Trade>>> GetTradesByUser(int userId)
        {
            return await _context.Trades
                .Include(t => t.User)
                .Where(t => t.UserId == userId)
                .ToListAsync();
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
        public async Task<ActionResult<Trade>> PostTrade(Trade trade)
        {
            trade.CreatedAt = DateTime.UtcNow;
            trade.UpdatedAt = DateTime.UtcNow;
            _context.Trades.Add(trade);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrade), new { id = trade.Id }, trade);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrade(int id, Trade trade)
        {
            if (id != trade.Id)
            {
                return BadRequest();
            }

            trade.UpdatedAt = DateTime.UtcNow;
            _context.Entry(trade).State = EntityState.Modified;

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
        public async Task<IActionResult> DeleteTrade(int id)
        {
            var trade = await _context.Trades.FindAsync(id);
            if (trade == null)
            {
                return NotFound();
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