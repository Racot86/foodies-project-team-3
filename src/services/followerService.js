import api from "./api";

export const followerService = {
    /**
     * Get followers for a specific user
     * @param {number} userId - The ID of the user
     * @param {number} page - Page number (default: 1)
     * @param {number} limit - Number of followers per page (default: 5)
     * @returns {Promise<Object>} - Response with followers data
     */
    getFollowers: async (userId, page = 1, limit = 5) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        return api.get(`/users/followers/${userId}?${params}`);
    },

    /**
     * Get following users for the current user
     * @param {number} page - Page number (default: 1)
     * @param {number} limit - Number of following users per page (default: 5)
     * @returns {Promise<Object>} - Response with following users data
     */
    getFollowing: async (page = 1, limit = 5) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });
        return api.get(`/users/following?${params}`);
    },

    /**
     * Check if the current user is following a specific user
     * @param {number} userId - The ID of the user to check
     * @returns {Promise<boolean>} - True if following, false otherwise
     */
    checkFollowStatus: async (userId) => {
        try {
            // Get the current user's following list with a small limit
            // We'll check if the specified user is in the first page of results
            const params = new URLSearchParams({
                page: "1",
                limit: "100", // Using a larger limit to increase chances of finding the user
            });
            const response = await api.get(`/users/following?${params}`);

            // Check if the user is in the following list
            // Convert userId to number for comparison since URL params are strings
            const userIdNum = Number(userId);
            return response.following.some(user => user.id === userIdNum);
        } catch (error) {
            console.error("Error checking follow status:", error);
            return false;
        }
    },

    /**
     * Follow a user
     * @param {number} userId - The ID of the user to follow
     * @returns {Promise<Object>} - Response with success message
     */
    followUser: async (userId) => {
        return api.post(`/users/follow/${userId}`);
    },

    /**
     * Unfollow a user
     * @param {number} userId - The ID of the user to unfollow
     * @returns {Promise<Object>} - Response with success message
     */
    unfollowUser: async (userId) => {
        return api.delete(`/users/unfollow/${userId}`);
    },
};
