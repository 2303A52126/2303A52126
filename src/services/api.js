import axios from 'axios';
import { Log } from '../utils/logger.js';

const TOKEN = 'YOUR_TOKEN';
const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  },
});

api.interceptors.request.use(
  (config) => {
    Log('API_REQUEST', 'info', 'api-service', `API request started: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    Log('API_REQUEST', 'error', 'api-service', `API request interceptor error: ${error.message}`);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    Log('API_RESPONSE', 'info', 'api-service', `API request success: ${response.config.url} (${response.status})`);
    return response;
  },
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Unknown error';
    Log('API_RESPONSE', 'error', 'api-service', `API request failure: ${message}`);
    return Promise.reject(error);
  }
);

export async function getNotifications({ limit = 10, page = 1, notification_type = null } = {}) {
  const params = { limit, page };
  if (notification_type) {
    params.notification_type = notification_type;
  }
  const response = await api.get('/notifications', { params });
  return response.data;
}

export default api;
