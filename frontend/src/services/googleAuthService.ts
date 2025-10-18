/**
 * Google Authentication Service
 * Handles Google OAuth2 authentication flow
 */

import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

const GOOGLE_CLIENT_ID = 'your-google-client-id'; // Replace with actual client ID
const GOOGLE_REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'platepilot',
  path: 'auth',
});

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface GoogleAuthResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

class GoogleAuthService {
  private discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');

  async signInWithGoogle(): Promise<GoogleAuthResponse | null> {
    try {
      // Create code verifier for PKCE
      const codeChallenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        GOOGLE_REDIRECT_URI,
        { encoding: Crypto.CryptoEncoding.BASE64URL }
      );

      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        redirectUri: GOOGLE_REDIRECT_URI,
        responseType: AuthSession.AuthSessionResponseType.Code,
        codeChallenge,
        codeChallengeMethod: AuthSession.AuthSessionCodeChallengeMethod.S256,
        extraParams: {
          access_type: 'offline',
        },
      });

      // Start auth session
      const result = await request.promptAsync(this.discovery);

      if (result.type === 'success') {
        // Exchange code for token
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: GOOGLE_CLIENT_ID,
            code: result.params.code,
            redirectUri: GOOGLE_REDIRECT_URI,
            extraParams: {
              code_verifier: GOOGLE_REDIRECT_URI,
            },
          },
          this.discovery
        );

        // Get user info from Google
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.accessToken}`
        );
        const userInfo: GoogleUserInfo = await userInfoResponse.json();

        // Send to backend for JWT token
        const backendResponse = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            googleId: userInfo.id,
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
          }),
        });

        if (backendResponse.ok) {
          const authResponse: GoogleAuthResponse = await backendResponse.json();
          return authResponse;
        } else {
          throw new Error('Backend authentication failed');
        }
      }

      return null;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  getGoogleSignInUrl(): string {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
}

export const googleAuthService = new GoogleAuthService();
