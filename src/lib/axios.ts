import axios from 'axios';

// ** Constants
import { RESPONSE_CODE } from '@/utils/constants';

// ** Endpoint Config
import {
  BASE_URL,
  REFRESH_TOKEN_ENDPOINT,
  STORAGE_TOKEN_KEY_NAME,
  TOKEN_EXPIRATION,
  TOKEN_TYPE,
} from '@/config';
import { StoreToken } from '@/types/commons';

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ** Interceptor request
axiosClient.interceptors.request.use(
  async (config) => {
    if (!config.headers?.Authorization) {
      // ** Assign access token
      const token: string = localStorage.getItem(STORAGE_TOKEN_KEY_NAME)
        ? JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY_NAME) || '')
        : '';
      config.headers['Authorization'] = `${TOKEN_TYPE} ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ** Interceptor response
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevRequest = error.config;

    if (error.response?.status === RESPONSE_CODE.UNAUTHORIZED && prevRequest.sent) {
      prevRequest.sent = true;
      try {
        const refreshToken = localStorage.getItem(TOKEN_EXPIRATION)
          ? JSON.parse(localStorage.getItem(TOKEN_EXPIRATION) || '')
          : '';
        const response = await axios.post<StoreToken>(
          REFRESH_TOKEN_ENDPOINT,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `${TOKEN_TYPE} ${refreshToken}`,
            },
          },
        );
        if (response.status === RESPONSE_CODE.CREATED) {
          localStorage.setItem(STORAGE_TOKEN_KEY_NAME, JSON.stringify(response.data.accessToken));
          localStorage.setItem(TOKEN_EXPIRATION, JSON.stringify(response.data.refreshToken));
          return axios(prevRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosClient;
