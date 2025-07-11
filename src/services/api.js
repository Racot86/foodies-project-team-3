import axios from 'axios';

const BASE_URL = 'https://project-team-3-backend-2.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';

    // If it's a 401 error from the /users/current endpoint, it means the user is not authenticated
    if (error.response?.status === 401 && error.config?.url?.includes('/users/current')) {
      // We'll still reject the promise, but with a specific message that indicates unauthenticated status
      return Promise.reject(new Error('Not authenticated'));
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
