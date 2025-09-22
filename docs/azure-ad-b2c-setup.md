# Azure AD B2C Configuration Guide

This document outlines the steps to integrate Azure AD B2C with the SoftBarter platform.

## Prerequisites

1. Azure subscription with Azure AD B2C tenant
2. Registered applications for web, mobile, and API
3. User flows configured for sign-up/sign-in

## Backend Configuration

### 1. Install Required Packages

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.Identity.Web
```

### 2. Update appsettings.json

```json
{
  "AzureAdB2C": {
    "Instance": "https://{tenant-name}.b2clogin.com",
    "ClientId": "{api-client-id}",
    "Domain": "{tenant-name}.onmicrosoft.com",
    "SignUpSignInPolicyId": "B2C_1_signupsignin1",
    "SignedOutCallbackPath": "/signout/B2C_1_signupsignin1"
  }
}
```

### 3. Program.cs Updates

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAdB2C"));
```

## Web Frontend Configuration

### 1. Install MSAL

```bash
npm install @azure/msal-browser @azure/msal-react
```

### 2. MSAL Configuration

```typescript
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID!,
    authority: `https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/B2C_1_signupsignin1`,
    knownAuthorities: ["{tenant}.b2clogin.com"],
    redirectUri: "/"
  }
};
```

## Mobile App Configuration

### 1. Install MSAL React Native

```bash
npm install @azure/msal-react-native
```

### 2. Configuration

```typescript
const msalConfig = {
  auth: {
    clientId: 'your-mobile-client-id',
    authority: 'https://{tenant}.b2clogin.com/{tenant}.onmicrosoft.com/B2C_1_signupsignin1'
  }
};
```

## Required Azure AD B2C Setup

### 1. User Flows

- **Sign up and sign in**: B2C_1_signupsignin1
- **Profile editing**: B2C_1_profileediting1
- **Password reset**: B2C_1_passwordreset1

### 2. Application Registrations

1. **API Application**
   - App ID URI: `https://{tenant}.onmicrosoft.com/api`
   - Expose API scopes: `access_as_user`

2. **Web Application**
   - Platform: Single-page application
   - Redirect URI: `https://your-domain.com`
   - Implicit grant: ID tokens

3. **Mobile Application**
   - Platform: Mobile and desktop applications
   - Redirect URI: Custom scheme for mobile

### 3. Custom Policies (Optional)

For advanced customization, create custom policies for:
- Multi-factor authentication
- Custom user attributes
- Social identity providers
- Custom branding

## Implementation Steps

1. **Phase 1**: Configure Azure AD B2C tenant and applications
2. **Phase 2**: Update backend API to validate B2C tokens
3. **Phase 3**: Integrate web frontend with MSAL.js
4. **Phase 4**: Integrate mobile app with MSAL React Native
5. **Phase 5**: Test end-to-end authentication flow
6. **Phase 6**: Configure production environments

## Environment Variables

### Backend
```
AzureAdB2C__Instance=https://{tenant}.b2clogin.com
AzureAdB2C__ClientId={api-client-id}
AzureAdB2C__Domain={tenant}.onmicrosoft.com
```

### Web
```
REACT_APP_AZURE_CLIENT_ID={web-client-id}
REACT_APP_AZURE_TENANT={tenant-name}
```

### Mobile
```typescript
// Configure in app.json or environment config
const config = {
  azureClientId: '{mobile-client-id}',
  azureTenant: '{tenant-name}'
};
```

## Migration Strategy

1. **Dual Authentication**: Support both JWT and Azure AD B2C
2. **User Migration**: Migrate existing users to B2C
3. **Gradual Rollout**: Feature flag for B2C authentication
4. **Fallback**: Maintain JWT for development/testing

## Security Considerations

- Use HTTPS in production
- Configure CORS properly
- Validate tokens on backend
- Store tokens securely (HttpOnly cookies for web, Keychain for mobile)
- Implement token refresh logic
- Monitor authentication events

## Testing

1. **Unit Tests**: Mock MSAL authentication
2. **Integration Tests**: Test with B2C dev tenant
3. **E2E Tests**: Full authentication flow
4. **Load Tests**: Authentication performance

This configuration will enable enterprise-grade authentication while maintaining the existing JWT-based development workflow.