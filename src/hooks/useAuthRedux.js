import { useSelector, useDispatch } from 'react-redux';
import {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  clearError,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsSignUpLoading,
  selectIsSignInLoading,
  selectIsSignOutLoading,
  selectIsGetCurrentUserLoading,
  selectError
} from '@/redux/slices/authSlice';

/**
 * Custom hook for authentication using Redux
 * @returns {Object} Authentication state and methods
 */
export const useAuthRedux = () => {
  const dispatch = useDispatch();

  // Select auth state from Redux store
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSignUpLoading = useSelector(selectIsSignUpLoading);
  const isSignInLoading = useSelector(selectIsSignInLoading);
  const isSignOutLoading = useSelector(selectIsSignOutLoading);
  const isGetCurrentUserLoading = useSelector(selectIsGetCurrentUserLoading);
  const error = useSelector(selectError);

  // Authentication methods
  const register = async (userData) => {
    return dispatch(signUp(userData)).unwrap();
  };

  const login = async (credentials) => {
    return dispatch(signIn(credentials)).unwrap();
  };

  const logout = async () => {
    return dispatch(signOut()).unwrap();
  };

  const fetchCurrentUser = async () => {
    return dispatch(getCurrentUser()).unwrap();
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {
    // State
    auth,
    user,
    isAuthenticated,
    isSignUpLoading,
    isSignInLoading,
    isSignOutLoading,
    isGetCurrentUserLoading,
    error,

    // Methods
    register,
    login,
    logout,
    fetchCurrentUser,
    resetError,
  };
};
