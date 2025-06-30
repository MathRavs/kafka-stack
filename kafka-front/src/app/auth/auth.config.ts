import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';


export const authDomain = 'https://us-east-1ky0ubs0nr.auth.us-east-1.amazoncognito.com';

export const authConfig = {
  config: {
              authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Ky0uBs0nR',
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              clientId: '23fnj2nbdrc5dgh75rb5ock0dk',
              scope: 'phone openid email', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          }
} as const satisfies PassedInitialConfig;
