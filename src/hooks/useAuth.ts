import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { RootState } from '../store';
import { 
  login, 
  register, 
  logoutUser, 
  getCurrentUser, 
  forgotPassword, 
  resetPassword,
  clearErrors,
  clearMessages
} from '../store/slices/authSlice';
import { LoginCredentials, RegisterData } from '../types/auth';
import { resetProfile } from '../store/slices/profileSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const loginUser = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        await dispatch(login(credentials)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const registerUser = useCallback(
    async (userData: RegisterData) => {
      try {
        await dispatch(register(userData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetProfile());
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      await dispatch(getCurrentUser()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const requestPasswordReset = useCallback(
    async (email: string) => {
      try {
        await dispatch(forgotPassword(email)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const confirmPasswordReset = useCallback(
    async (token: string, password: string) => {
      try {
        await dispatch(resetPassword({ token, password })).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const clearAuthErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const clearAuthMessages = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    successMessage: auth.successMessage,
    loginUser,
    registerUser,
    logout,
    fetchCurrentUser,
    requestPasswordReset,
    confirmPasswordReset,
    clearAuthErrors,
    clearAuthMessages
  };
};