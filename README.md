# SoftBarter

A comprehensive trading platform where users can exchange goods and services with confidence. Built with .NET 8 backend, React web frontend, and React Native mobile app.

## 🚀 Features

### Authentication & Security
- JWT-based authentication with secure token management
- User registration and login system
- Protected routes and API endpoints
- Prepared for Azure AD B2C integration

### Trading System
- **Create Trades**: Post items you want to trade with detailed descriptions
- **Browse & Search**: Find trades by category, location, value, condition
- **Make Offers**: Send offers with items or monetary compensation
- **Accept/Reject**: Trade owners can respond to offers
- **Transaction Management**: Complete trades with ratings and reviews
- **View Tracking**: Monitor trade popularity

### Platform Coverage
- **Web Application**: React TypeScript SPA with responsive design
- **Mobile Application**: React Native app with Expo for iOS/Android
- **REST API**: Comprehensive .NET 8 Web API with Swagger documentation

## 🏗️ Architecture

```
SoftBarter/
├── backend/          # .NET 8 Web API
├── web/              # React TypeScript SPA
├── mobile/           # React Native Expo App
└── .github/workflows # CI/CD Pipelines
```

### Backend (.NET 8 Web API)
- **Framework**: ASP.NET Core 8.0
- **Database**: Entity Framework Core (In-Memory for dev, SQL Server for prod)
- **Authentication**: JWT Bearer tokens
- **Documentation**: Swagger/OpenAPI
- **Features**: CRUD operations, search/filtering, offer management, transactions

### Web Frontend (React TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router for SPA navigation
- **State Management**: React Context for authentication
- **API Client**: Axios with interceptors
- **Styling**: CSS modules with responsive design

### Mobile App (React Native + Expo)
- **Framework**: React Native with Expo SDK
- **Navigation**: React Navigation
- **Storage**: Expo SecureStore for token management
- **Platform**: iOS, Android, and Web support

## 🛠️ Development Setup

### Prerequisites
- **.NET 8 SDK** for backend development
- **Node.js 18+** for frontend development
- **Expo CLI** for mobile development
- **Git** for version control

### Backend Setup
```bash
cd backend/SoftBarter.API
dotnet restore
dotnet build
dotnet run
```
API will be available at `http://localhost:5032` with Swagger UI at the root.

### Web Frontend Setup
```bash
cd web
npm install
npm start
```
Web app will be available at `http://localhost:3000`.

### Mobile App Setup
```bash
cd mobile
npm install
npm start
```
Use Expo Go app to scan QR code for mobile testing.

## 📱 Demo Accounts

For testing purposes:
- **Email**: `john.doe@example.com` | **Password**: `password123`
- **Email**: `jane.smith@example.com` | **Password**: `password123`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Trades
- `GET /api/trades` - Browse trades with search/filter
- `POST /api/trades` - Create new trade (protected)
- `GET /api/trades/{id}` - Get trade details
- `GET /api/trades/my-trades` - Get user's trades (protected)
- `PUT /api/trades/{id}` - Update trade (protected)
- `DELETE /api/trades/{id}` - Delete/cancel trade (protected)

### Offers
- `GET /api/offers/trade/{tradeId}` - Get offers for a trade
- `POST /api/offers/trade/{tradeId}` - Create offer (protected)
- `PUT /api/offers/{id}/respond` - Accept/reject offer (protected)
- `DELETE /api/offers/{id}` - Withdraw offer (protected)

### Transactions
- `GET /api/transactions/my-transactions` - Get user transactions (protected)
- `POST /api/transactions/{id}/complete` - Complete transaction (protected)
- `POST /api/transactions/{id}/rate` - Rate transaction (protected)
- `POST /api/transactions/{id}/cancel` - Cancel transaction (protected)

## 🚀 Deployment

### Azure App Service (Backend)
1. Create Azure App Service for .NET 8
2. Configure Application Settings:
   ```
   ConnectionStrings__AzureSqlConnection: [Your SQL Connection String]
   Jwt__SecretKey: [Your JWT Secret]
   ApplicationInsights__ConnectionString: [App Insights Connection]
   ```
3. Deploy via GitHub Actions or Azure DevOps

### Azure Static Web Apps (Frontend)
1. Create Azure Static Web App
2. Configure build settings:
   - **App location**: `/web`
   - **Build location**: `/web/build`
   - **Output location**: `` (empty)
3. Set environment variables:
   ```
   REACT_APP_API_URL: https://your-api.azurewebsites.net
   ```

### Expo Application Services (Mobile)
1. Install EAS CLI: `npm install -g eas-cli`
2. Configure: `eas build:configure`
3. Build: `eas build --platform all`
4. Submit: `eas submit --platform all`

## 🔄 CI/CD Pipelines

### GitHub Actions Workflows
- **CI Pipeline**: Builds and tests all components on PRs
- **Backend Deployment**: Deploys API to Azure App Service
- **Web Deployment**: Deploys React app to Azure Static Web Apps
- **Mobile Deployment**: Builds and publishes mobile app via Expo

### Required Secrets
```bash
# Azure Deployment
AZURE_WEBAPP_PUBLISH_PROFILE     # Backend deployment profile
AZURE_STATIC_WEB_APPS_API_TOKEN  # Static Web Apps deployment token

# Mobile Deployment
EXPO_TOKEN                       # Expo authentication token

# GitHub Actions
GITHUB_TOKEN                     # Automatically provided
```

## 🧪 Testing

### Backend Tests
```bash
cd backend/SoftBarter.API
dotnet test
```

### Web Tests
```bash
cd web
npm test
```

### Mobile Tests
```bash
cd mobile
npx tsc --noEmit  # TypeScript check
```

## 📄 Environment Variables

### Backend (appsettings.json)
```json
{
  "Jwt": {
    "SecretKey": "your-secret-key",
    "Issuer": "SoftBarter",
    "Audience": "SoftBarter_Users"
  },
  "ConnectionStrings": {
    "AzureSqlConnection": "your-connection-string"
  }
}
```

### Web (.env)
```
REACT_APP_API_URL=http://localhost:5032
```

### Mobile (API configuration)
```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5032' 
  : 'https://your-api-url.com';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow
1. All changes go through Pull Requests
2. CI pipeline must pass
3. Code review required
4. Deploy to staging environment first
5. Manual testing before production deployment

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features via GitHub Issues
- **Documentation**: Check component README files for detailed setup instructions
- **API Documentation**: Access Swagger UI at the API root URL

## 🔮 Future Enhancements

- **Azure AD B2C Integration**: Enterprise authentication
- **Real-time Notifications**: WebSignalR for live updates
- **Image Upload**: File storage for trade photos
- **Geolocation**: Location-based trade discovery
- **Payment Integration**: Secure payment processing
- **Advanced Search**: Elasticsearch integration
- **Performance Monitoring**: Application Insights integration

---

**Built with ❤️ for the trading community**
