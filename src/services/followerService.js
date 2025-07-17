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
