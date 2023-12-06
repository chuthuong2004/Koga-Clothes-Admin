
export const REFRESH_TOKEN_ENDPOINT = `/refresh-token`; // ** refresh token endpoint
export const FIREBASE_TOKEN_ENDPOINT = '/auth/token'; // ** firebase token endpoint
export const STORAGE_TOKEN_KEY_NAME = 'accessToken';
export const TOKEN_EXPIRATION = 'refreshToken'; // logout | refreshToken
// ** This will be prefixed in authorization header with token
// ? e.g. Authorization: Bearer <token>
export const TOKEN_TYPE = 'Bearer';
