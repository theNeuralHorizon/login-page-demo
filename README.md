# AWS Cognito Authentication Demo

A beautiful, minimal React application featuring AWS Cognito authentication with sign-in and sign-up functionality. This demo showcases a modern, responsive UI with glassmorphism design effects.

## Features

- ✨ **Beautiful UI**: Modern glassmorphism design with gradient backgrounds
- 🔐 **AWS Cognito Integration**: Complete authentication flow with AWS Cognito
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- 🔄 **Sign In/Sign Up**: Toggle between authentication modes
- ✅ **Email Verification**: Built-in email verification flow
- 👤 **User Profile**: Display user information and account details
- 🔒 **Protected Routes**: Route protection based on authentication status
- 🚀 **Fast Loading**: Optimized performance with loading states

## Screenshots

The application features a stunning gradient background with glassmorphism cards that provide a modern, clean authentication experience.

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with Cognito access
- Basic knowledge of React and AWS Cognito

## AWS Cognito Setup

### 1. Create a User Pool

1. Go to AWS Cognito Console
2. Click "Create User Pool"
3. Configure the following settings:
   - **Sign-in options**: Email
   - **Password policy**: Minimum 8 characters
   - **MFA**: Optional (recommended to keep OFF for demo)
   - **Self-service account recovery**: Email only
   - **Self-service sign-up**: Enable
   - **Email verification**: Required
   - **Attributes**: Email (required), Name (optional)

### 2. Create App Client

1. In your User Pool, go to "App integration"
2. Click "Create app client"
3. Configure:
   - **App type**: Public client
   - **App client name**: Your app name
   - **Authentication flows**: 
     - ✅ ALLOW_USER_PASSWORD_AUTH
     - ✅ ALLOW_REFRESH_TOKEN_AUTH
     - ✅ ALLOW_USER_SRP_AUTH
   - **Auth flows**: Configure as needed
   - **OAuth 2.0 settings**: 
     - **OAuth flows**: Authorization code grant
     - **OAuth scopes**: email, openid, profile
     - **Callback URLs**: http://localhost:3000/ (for development)
     - **Sign out URLs**: http://localhost:3000/ (for development)

### 3. Configure Hosted UI (Optional)

1. In "App integration", click "Customize hosted UI"
2. Configure domain settings
3. Set up custom branding if desired

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd login-page-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```

4. **Configure your .env file**
   ```env
   REACT_APP_AWS_PROJECT_REGION=us-east-1
   REACT_APP_AWS_COGNITO_REGION=us-east-1
   REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=your-identity-pool-id
   REACT_APP_AWS_USER_POOLS_ID=your-user-pool-id
   REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID=your-web-client-id
   REACT_APP_COGNITO_DOMAIN=your-cognito-domain.auth.us-east-1.amazoncognito.com
   REACT_APP_REDIRECT_URI=http://localhost:3000/
   ```

## Configuration Guide

### Finding Your AWS Cognito Values

1. **User Pool ID**: 
   - Go to Cognito Console → User pools → Your pool
   - Copy the "User pool ID" (format: us-east-1_xxxxxxxxx)

2. **Web Client ID**:
   - In your User Pool → App integration → App clients
   - Copy the "Client ID"

3. **Identity Pool ID** (Optional):
   - Go to Cognito Console → Identity pools
   - Copy the "Identity pool ID"

4. **Cognito Domain**:
   - In your User Pool → App integration → Domain
   - Copy the domain URL

### Environment Variable Details

- `REACT_APP_AWS_PROJECT_REGION`: AWS region (e.g., us-east-1)
- `REACT_APP_AWS_COGNITO_REGION`: AWS Cognito region (usually same as project region)
- `REACT_APP_AWS_USER_POOLS_ID`: Your Cognito User Pool ID
- `REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID`: Your app client ID
- `REACT_APP_COGNITO_DOMAIN`: Your Cognito domain URL
- `REACT_APP_REDIRECT_URI`: Where users are redirected after authentication

## Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Open your browser**
   - Navigate to `http://localhost:3000`
   - You should see the beautiful authentication interface

## Usage

### Sign Up Flow
1. Click "Sign Up" on the auth page
2. Enter your email and password
3. Click "Sign Up"
4. Check your email for verification code
5. Enter the verification code
6. You'll be redirected to sign in

### Sign In Flow
1. Enter your verified email and password
2. Click "Sign In"
3. You'll be redirected to your profile page

### Profile Page
- View your account information
- See verification status
- Sign out securely

## Project Structure

```
src/
├── components/
├── context/
│   └── AuthContext.js       # Authentication context and logic
├── pages/
│   ├── Auth.jsx            # Authentication page (sign in/up)
│   ├── Auth.css            # Authentication styles
│   ├── Profile.jsx         # User profile page
│   └── Profile.css         # Profile styles
├── aws-exports.js          # AWS configuration
├── App.js                  # Main app component with routing
└── index.js               # App entry point
```

## Customization

### Styling
- Modify `src/pages/Auth.css` for authentication page styles
- Modify `src/pages/Profile.css` for profile page styles
- Colors and gradients can be customized in CSS files

### Authentication Flow
- Edit `src/context/AuthContext.js` to modify authentication logic
- Add additional user attributes in the sign-up flow
- Customize error handling and user feedback

## Troubleshooting

### Common Issues

1. **"User does not exist" error**
   - Ensure email is verified
   - Check if user was created successfully

2. **"Invalid client id" error**
   - Verify `REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID` is correct
   - Ensure the client ID is from the same user pool

3. **"Invalid redirect URI" error**
   - Check that redirect URI matches exactly in Cognito settings
   - Ensure no trailing slashes if not specified in Cognito

4. **CORS errors**
   - Ensure your domain is whitelisted in Cognito
   - Check that all required OAuth settings are configured

### Debug Mode
Enable debug mode by adding to your `.env`:
```env
REACT_APP_DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Review AWS Cognito documentation
3. Open an issue in the repository

## Acknowledgments

- Built with React and AWS Amplify
- UI inspired by modern glassmorphism design trends
- Authentication powered by AWS Cognito
