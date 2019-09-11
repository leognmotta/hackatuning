import axios from 'axios';
import { getToken } from '../utils/auth';

const url = process.env.API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(async param => {
  const config = param;
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
