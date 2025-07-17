import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followerService } from "@/services";

const initialState = {
  followers: [],
  following: [],
  followersTotal: 0,
  followingTotal: 0,
  followersPage: 1,
  followingPage: 1,
  followersLimit: 5,
  followingLimit: 5,
  isFollowersLoading: false,
  isFollowingLoading: false,
  isFollowActionLoading: false,
  fetchingError: null, // Only for data fetching errors (getFollowers, getFollowing)
  followActionError: null, // Separate error for follow actions
  unfollowActionError: null, // Separate error for unfollow actions
};

// Async thunks
export const getFollowers = createAsyncThunk(
  "followers/getFollowers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await followerService.getFollowers(
        params?.userId,
        params?.page || 1,
        params?.limit || 5
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch followers"
      );
    }
  }
);

export const getFollowing = createAsyncThunk(
  "followers/getFollowing",
  async (params, { rejectWithValue }) => {
    try {
      const response = await followerService.getFollowing(1, 5);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch following"
      );
    }
  }
);

export const followUser = createAsyncThunk(
  "followers/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await followerService.followUser(userId);
      return {
        userId,
        message: response.message,
        alreadyFollowing: false,
        newFollowedUser: response.user, // Assuming the API returns the user data
      };
    } catch (error) {
      // If it's 409 (Conflict) - user is already following
      if (error.response?.status === 409) {
        return {
          userId,
          message: "Already following this user",
          alreadyFollowing: true,
        };
      }

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to follow user"
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "followers/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await followerService.unfollowUser(userId);
      return { userId, message: response.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to unfollow user"
      );
    }
  }
);

export const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    clearFollowersError: (state) => {
      state.fetchingError = null;
    },
    clearFollowActionError: (state) => {
      state.followActionError = null;
    },
    clearUnfollowActionError: (state) => {
      state.unfollowActionError = null;
    },
    resetFollowersData: (state) => {
      state.followers = [];
      state.following = [];
      state.followersTotal = 0;
      state.followingTotal = 0;
      state.followersPage = 1;
      state.followingPage = 1;
      state.fetchingError = null;
      state.followActionError = null;
      state.unfollowActionError = null;
    },
    setFollowersPage: (state, action) => {
      state.followersPage = action.payload;
    },
    setFollowingPage: (state, action) => {
      state.followingPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get followers
      .addCase(getFollowers.pending, (state) => {
        state.isFollowersLoading = true;
        state.fetchingError = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isFollowersLoading = false;
        state.followers = action.payload.followers;
        state.followersTotal = action.payload.total;
        state.followersPage = action.payload.page;
        state.followersLimit = action.payload.limit;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isFollowersLoading = false;
        state.fetchingError = action.payload;
      })
      // Get following
      .addCase(getFollowing.pending, (state) => {
        state.isFollowingLoading = true;
        state.fetchingError = null;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isFollowingLoading = false;
        state.following = action.payload.following;
        state.followingTotal = action.payload.total;
        state.followingPage = action.payload.page;
        state.followingLimit = action.payload.limit;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.isFollowingLoading = false;
        state.fetchingError = action.payload;
      })
      // Follow user
      .addCase(followUser.pending, (state) => {
        state.isFollowActionLoading = true;
        state.followActionError = null; // Clear follow action errors
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isFollowActionLoading = false;
        state.followActionError = null; // Clear follow action errors

        // If user was already following, don't modify state
        if (action.payload.alreadyFollowing) {
          return;
        }

        // Add the new followed user to the following list if available
        if (action.payload.newFollowedUser) {
          state.following.push(action.payload.newFollowedUser);
        }

        state.followingTotal += 1;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isFollowActionLoading = false;
        state.followActionError = action.payload; // Set only follow action error, not main error
      })
      // Unfollow user
      .addCase(unfollowUser.pending, (state) => {
        state.isFollowActionLoading = true;
        state.unfollowActionError = null; // Clear unfollow action errors
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isFollowActionLoading = false;
        state.unfollowActionError = null; // Clear unfollow action errors
        state.following = state.following.filter(
          (user) => user.id !== action.payload.userId
        );
        state.followingTotal -= 1;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isFollowActionLoading = false;
        state.unfollowActionError = action.payload; // Set only unfollow action error, not main error
      });
  },
});

export const {
  clearFollowersError,
  clearFollowActionError,
  clearUnfollowActionError,
  resetFollowersData,
  setFollowersPage,
  setFollowingPage,
} = followersSlice.actions;

export default followersSlice.reducer;
