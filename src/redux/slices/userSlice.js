import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";

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
  error: null,
};

export const userDetails = createAsyncThunk(
  "user/details",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.userDetails(userId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "User details failed"
      );
    }
  }
);

export const userAvatar = createAsyncThunk(
  "user/avatar",
  async (file, { rejectWithValue }) => {
    try {
      const response = await userService.uploadAvatar(file);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Update avatar failed"
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
      });
  },
});

export const { clearError } = userSlice.actions;
export const selectUserDetails = (state) => {
  return state.users.details;
};
export default userSlice.reducer;
