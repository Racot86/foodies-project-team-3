import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authService} from '@/services';

// Get user data from localStorage
const foodiesData = localStorage.getItem('foodies');
let token = null;
let username = null;
let avatar = null;

if (foodiesData) {
  try {
    const parsedData = JSON.parse(foodiesData);
    token = parsedData.token || null;
    username = parsedData.username || null;
    avatar = parsedData.avatar || null;
  } catch (error) {
    console.error('Error parsing foodies data from localStorage:', error);
  }
}

// Async thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(userData);
      // Store user data in localStorage as JSON
      const foodiesData = {
        token: response.token,
        username: response.user.name,
        avatar: response.user.avatar || null
      };
      localStorage.setItem('foodies', JSON.stringify(foodiesData));
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Sign up failed');
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(credentials);
      // Store user data in localStorage as JSON
      const foodiesData = {
        token: response.token,
        username: response.user.name,
        avatar: response.user.avatar || null
      };
      localStorage.setItem('foodies', JSON.stringify(foodiesData));
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Sign in failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser();
    } catch (error) {
      // Handle the specific 'Not authenticated' error message from the api interceptor
      if (error.message === 'Not authenticated') {
        return rejectWithValue('Not authenticated');
      }
      return rejectWithValue(error.message || 'Failed to get user data');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOut();
      // Remove user data from localStorage
      localStorage.removeItem('foodies');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Sign out failed');
    }
  }
);

// Initial state
const initialState = {
  user: username ? { name: username, avatar: avatar || null } : null,
  token: token || null,
  isAuthenticated: !!token,
  isSignUpLoading: false,
  isSignInLoading: false,
  isSignOutLoading: false,
  isGetCurrentUserLoading: false,
  error: null,
};

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isSignUpLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignUpLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignUpLoading = false;
        state.error = action.payload;
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isSignInLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isSignInLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSignInLoading = false;
        state.error = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isGetCurrentUserLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isGetCurrentUserLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isGetCurrentUserLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
        // Clear user data from localStorage if user data fetch fails
        localStorage.removeItem('foodies');
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isSignOutLoading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isSignOutLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isSignOutLoading = false;
        state.error = action.payload;
        // Still clear user data even if sign out API call fails
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        // Clear user data from localStorage
        localStorage.removeItem('foodies');
      });
  },
});

// Export actions
export const { clearError } = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsSignUpLoading = (state) => state.auth.isSignUpLoading;
export const selectIsSignInLoading = (state) => state.auth.isSignInLoading;
export const selectIsSignOutLoading = (state) => state.auth.isSignOutLoading;
export const selectIsGetCurrentUserLoading = (state) => state.auth.isGetCurrentUserLoading;
export const selectError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
