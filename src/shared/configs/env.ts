export const APP_URL = import.meta.env.VITE_APP_URL as string;
export const PORT = import.meta.env.VITE_PORT as string;
export const API_URL = `${APP_URL}:${PORT}/api/`;
export const REFRESH_TOKEN_URL = '/auth/token/refresh';
