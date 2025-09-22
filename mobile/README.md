# SoftBarter Mobile App

React Native mobile application for the SoftBarter trading platform built with Expo.

## Features

- **Cross-platform**: Runs on both iOS and Android
- **JWT Authentication**: Secure login and registration
- **Modern Navigation**: React Navigation with stack and tab navigators
- **Secure Storage**: Expo SecureStore for token management
- **TypeScript**: Type-safe development
- **Responsive Design**: Optimized for mobile devices

## Prerequisites

- Node.js 18+ 
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device for testing

## Development Setup

1. **Install dependencies**:
   ```bash
   cd mobile
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on specific platforms**:
   ```bash
   npm run android    # Android device/emulator
   npm run ios        # iOS device/simulator (macOS only)
   npm run web        # Web browser
   ```

## Project Structure

```
mobile/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (AuthContext)
│   ├── screens/        # App screens
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── App.tsx             # Root component
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## API Configuration

The app connects to the SoftBarter backend API:
- **Development**: `http://localhost:5032`
- **Production**: Configure in `src/services/api.ts`

## Authentication

- JWT token stored securely using Expo SecureStore
- Auto-refresh and logout on token expiration
- Demo accounts available for testing

## Building for Production

1. **Configure app.json** with your app details
2. **Build for app stores**:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```
3. **Submit to stores**:
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

## Environment Variables

Create a `.env` file:
```
API_URL=https://your-api-url.com
```

## Demo Accounts

For testing purposes:
- Email: `john.doe@example.com` / Password: `password123`
- Email: `jane.smith@example.com` / Password: `password123`

## Deployment

### Expo Application Services (EAS)

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**:
   ```bash
   eas build:configure
   ```

3. **Build and deploy**:
   ```bash
   eas build --platform all
   eas submit --platform all
   ```

### Over-the-Air Updates

```bash
eas update --auto
```

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on both iOS and Android
4. Update this README for new features

## License

This project is part of the SoftBarter platform.