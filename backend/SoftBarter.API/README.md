# SoftBarter Backend API

This is the backend API for the SoftBarter trading platform built with .NET 8 Web API.

## Features

- **RESTful API** with comprehensive CRUD operations for Users and Trades
- **Entity Framework Core** with in-memory database for development
- **OpenAPI/Swagger Documentation** available at the root URL
- **Minimal API endpoints** for quick access
- **CORS enabled** for cross-origin requests
- **Azure App Service ready** with production configurations

## Project Structure

```
backend/SoftBarter.API/
├── Controllers/           # Web API controllers
│   ├── UsersController.cs
│   └── TradesController.cs
├── Models/               # Data models
│   ├── User.cs
│   └── Trade.cs
├── Data/                 # Entity Framework context
│   └── SoftBarterDbContext.cs
├── Program.cs            # Application entry point
├── appsettings.json      # Application configuration
├── appsettings.Development.json
└── web.config           # Azure App Service configuration
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Trades
- `GET /api/trades` - Get all trades
- `GET /api/trades/{id}` - Get trade by ID
- `GET /api/trades/user/{userId}` - Get trades by user
- `GET /api/trades/active` - Get active trades
- `POST /api/trades` - Create new trade
- `PUT /api/trades/{id}` - Update trade
- `DELETE /api/trades/{id}` - Delete trade

### Minimal API Endpoints
- `GET /` - Welcome message with API documentation link
- `GET /health` - Health check endpoint
- `GET /api/users/minimal` - Quick access to users
- `GET /api/trades/minimal` - Quick access to trades

## Models

### User Model
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "bio": "Avid trader looking for interesting exchanges.",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z",
  "trades": []
}
```

### Trade Model
```json
{
  "id": 1,
  "title": "Vintage Book for Rare Coin",
  "description": "Trading a first edition vintage book for a rare coin from the 1800s.",
  "itemOffered": "Vintage Book",
  "itemSought": "Rare Coin",
  "status": 0,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z",
  "userId": 1,
  "user": { ... }
}
```

## Running the Application

1. **Prerequisites**: .NET 8 SDK

2. **Build and Run**:
   ```bash
   cd backend/SoftBarter.API
   dotnet restore
   dotnet build
   dotnet run
   ```

3. **Access the API**:
   - Swagger UI: `http://localhost:5000/`
   - Health Check: `http://localhost:5000/health`
   - API Base: `http://localhost:5000/api/`

## Azure App Service Deployment

The project is ready for Azure App Service deployment with:
- `web.config` configured for IIS hosting
- Connection strings ready for Azure SQL Database
- Application Insights configuration placeholder
- CORS enabled for web frontend
- Production-ready logging configuration

### Environment Variables for Production
- `ConnectionStrings__AzureSqlConnection` - Azure SQL Database connection string
- `ApplicationInsights__ConnectionString` - Application Insights connection string

## Development Notes

- Uses Entity Framework Core In-Memory database for development
- Includes sample seed data for testing
- JSON serialization configured to handle circular references
- Comprehensive error handling and validation
- Ready for integration with frontend applications