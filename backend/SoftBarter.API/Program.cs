using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SoftBarter.API.Data;
using SoftBarter.API.Models;
using SoftBarter.API.Services;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Add Entity Framework
builder.Services.AddDbContext<SoftBarterDbContext>(options =>
    options.UseInMemoryDatabase("SoftBarterDb"));

// Add JWT Authentication
var jwtKey = builder.Configuration["Jwt:SecretKey"] ?? "SoftBarter_Default_Secret_Key_For_Development_Only_12345";
var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "SoftBarter",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "SoftBarter_Users",
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// Add custom services
builder.Services.AddScoped<IJwtService, JwtService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { 
        Title = "SoftBarter API", 
        Version = "v1",
        Description = "A simple API for trading platform with JWT authentication",
        Contact = new() { Name = "SoftBarter Team" }
    });
    
    // Add JWT Authentication to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Add CORS for Azure App Service
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SoftBarter API v1");
        c.RoutePrefix = string.Empty; // Makes Swagger UI available at the root
    });
}

app.UseHttpsRedirection();
app.UseCors();

// Add authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Minimal API endpoints
app.MapGet("/", () => "Welcome to SoftBarter API! Visit /swagger for API documentation.")
   .WithName("Root")
   .WithOpenApi();

app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }))
   .WithName("HealthCheck")
   .WithOpenApi();

// Sample minimal API endpoints for quick access
app.MapGet("/api/users/minimal", async (SoftBarterDbContext context) =>
{
    var users = await context.Users.ToListAsync();
    return Results.Ok(users);
})
.WithName("GetUsersMinimal")
.WithOpenApi();

app.MapGet("/api/trades/minimal", async (SoftBarterDbContext context) =>
{
    var trades = await context.Trades.Include(t => t.User).ToListAsync();
    return Results.Ok(trades);
})
.WithName("GetTradesMinimal")
.WithOpenApi();

// Initialize database with seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SoftBarterDbContext>();
    context.Database.EnsureCreated();
}

app.Run();
