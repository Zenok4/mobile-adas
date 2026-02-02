//api.ts
import axios from 'axios';
import Config from 'react-native-config';

export const api = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = 'JWT_TOKEN_Ở_ĐÂY';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

