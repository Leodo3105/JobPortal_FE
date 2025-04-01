import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { RootState } from '../store';
import {
  fetchProfile,
  updateProfile,
  addProfileEducation,
  removeEducation,
  addProfileExperience,
  removeExperience,
  uploadProfileCV,
  deleteProfileCV,
  uploadProfileAvatar,
  resetProfileAvatar,
  fetchAllProfiles,
  fetchProfileById,
  deleteProfile,
  clearProfileErrors,
  clearProfileMessages
} from '../store/slices/profileSlice';
import { JobseekerProfile } from '../types/user';
import { EducationInput, ExperienceInput } from '../types/profile';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state: RootState) => state.profile);

  const getProfile = useCallback(async () => {
    try {
      await dispatch(fetchProfile()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(
    async (profileData: Partial<JobseekerProfile>) => {
      try {
        await dispatch(updateProfile(profileData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const addEducation = useCallback(
    async (educationData: EducationInput) => {
      try {
        await dispatch(addProfileEducation(educationData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const deleteEducation = useCallback(
    async (educationId: string) => {
      try {
        await dispatch(removeEducation(educationId)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const addExperience = useCallback(
    async (experienceData: ExperienceInput) => {
      try {
        await dispatch(addProfileExperience(experienceData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const deleteExperience = useCallback(
    async (experienceId: string) => {
      try {
        await dispatch(removeExperience(experienceId)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const uploadCV = useCallback(
    async (formData: FormData) => {
      try {
        await dispatch(uploadProfileCV(formData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const removeCV = useCallback(async () => {
    try {
      await dispatch(deleteProfileCV()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const uploadAvatar = useCallback(
    async (formData: FormData) => {
      try {
        await dispatch(uploadProfileAvatar(formData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const resetAvatar = useCallback(async () => {
    try {
      await dispatch(resetProfileAvatar()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const getAllPublicProfiles = useCallback(async () => {
    try {
      await dispatch(fetchAllProfiles()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const getUserProfileById = useCallback(
    async (userId: string) => {
      try {
        await dispatch(fetchProfileById(userId)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const removeProfile = useCallback(async () => {
    try {
      await dispatch(deleteProfile()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  const clearErrors = useCallback(() => {
    dispatch(clearProfileErrors());
  }, [dispatch]);

  const clearMessages = useCallback(() => {
    dispatch(clearProfileMessages());
  }, [dispatch]);

  return {
    profile: profileState.profile,
    publicProfiles: profileState.publicProfiles,
    viewingProfile: profileState.viewingProfile,
    loading: profileState.loading,
    error: profileState.error,
    successMessage: profileState.successMessage,
    getProfile,
    updateUserProfile,
    addEducation,
    deleteEducation,
    addExperience,
    deleteExperience,
    uploadCV,
    removeCV,
    uploadAvatar,
    resetAvatar,
    getAllPublicProfiles,
    getUserProfileById,
    removeProfile,
    clearErrors,
    clearMessages
  };
};