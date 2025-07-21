import api from './api';

export const authService = {
    /**
     * Register a new user
     * @param {Object} userData - User data including name, email, and password
     * @returns {Promise<Object>} - Response with token and user data
     */
    signUp: async (userData) => {
        return api.post('/users/signup', userData);
    },

    /**
     * Login a user
     * @param {Object} credentials - User credentials including email and password
     * @returns {Promise<Object>} - Response with token and user data
     */
    signIn: async (credentials) => {
        return api.post('/users/signin', credentials);
    },

    /**
     * Logout the current user
     * @returns {Promise<void>}
     */
    signOut: async () => {
        return api.post('/users/logout');
    },

    /**
     * Get current user information
     * @returns {Promise<Object>} - User data
     */
    getCurrentUser: async () => {
        return api.get('/users/current');
    }
};
