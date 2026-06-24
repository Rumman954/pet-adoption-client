import axios from 'axios';

const TOKEN_KEY = 'pethome-token';

const resolveBaseURL = () => {
  const fromEnv = import.meta.env.VITE_API_URL || '';
  if (import.meta.env.PROD) {
    if (!fromEnv || fromEnv.includes('localhost') || fromEnv.includes('127.0.0.1')) {
      return '';
    }
    return fromEnv;
  }
  return fromEnv || 'http://localhost:5000';
};

const api = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { TOKEN_KEY };
export default api;
