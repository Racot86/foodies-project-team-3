import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "@/services/userService.js";

const initialState = {
    details: {
        avatar: "",
        name: "",
        email: "",
        recipes: 0,
        followers: 0,
        favorites: 0,
        following: 0,
    },
    isUserDetailsLoading: false,
    isUserAvatarUploading: false,
    isFollowUserProcessing: false,
    error: null,
};

export const userDetails = createAsyncThunk(
    "user/details",
    async (userId, {rejectWithValue}) => {
        try {
            return await userService.userDetails(userId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "User details failed"
            );
        }
    }
);

export const userAvatar = createAsyncThunk(
    "user/avatar",
    async (file, {rejectWithValue}) => {
        try {
            return await userService.uploadAvatar(file);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Update avatar failed"
            );
        }
    }
);

export const followUser = createAsyncThunk(
    "user/follow",
    async (userId, {rejectWithValue}) => {
        try {
            return await userService.followUser(userId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || "Failed to follow"
            );
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // User Details
            .addCase(userDetails.pending, (state) => {
                state.isUserDetailsLoading = true;
                state.error = null;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.isUserDetailsLoading = false;
                state.details = action.payload;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.isUserDetailsLoading = false;
                state.error = action.payload;
            })
            // User Avatar
            .addCase(userAvatar.pending, (state) => {
                state.isUserAvatarUploading = true;
                state.error = null;
            })
            .addCase(userAvatar.fulfilled, (state, action) => {
                state.isUserAvatarUploading = false;
                state.details.avatar = action.payload.avatar;
            })
            .addCase(userAvatar.rejected, (state, action) => {
                state.isUserAvatarUploading = false;
                state.error = action.payload;
            })
            .addCase(followUser.pending, (state) => {
                state.isFollowUserProcessing = true;
                state.error = null;
            })
            .addCase(followUser.fulfilled, (state) => {
                state.isFollowUserProcessing = false;
            })
            .addCase(followUser.rejected, (state, action) => {
                state.isFollowUserProcessing = false;
                state.error = action.payload;
            });
    },
});

export const {clearError} = userSlice.actions;
export const selectUserDetails = (state) => {
    return state.users.details;
};
export const selectError = (state) => {
    return state.users.error;
};
export default userSlice.reducer;
