import api from './api';

export const userService = {

    userDetails: async (userId) => {
        return api.get(`/users/details/${userId}`);
    },

    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return api.patch(`/users/avatars`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    followUser: async (userId) => {
        return api.post(`/users/follow/${userId}`);
    }
}