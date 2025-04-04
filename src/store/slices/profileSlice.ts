import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getUserProfile, 
  updateUserProfile, 
  addEducation, 
  deleteEducation, 
  addExperience, 
  deleteExperience, 
  uploadCV, 
  deleteCV, 
  uploadAvatar,
  resetAvatar,
  getAllProfiles,
  getProfileById,
  deleteProfile as deleteProfileApi
} from '../../services/profileService';
import { JobseekerProfile } from '../../types/user';
import { EducationInput, ExperienceInput } from '../../types/profile';
import { updateUserAvatar } from './authSlice';

interface ProfileState {
  profile: JobseekerProfile | null;
  publicProfiles: JobseekerProfile[];
  viewingProfile: JobseekerProfile | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ProfileState = {
  profile: null,
  publicProfiles: [],
  viewingProfile: null,
  loading: false,
  error: null,
  successMessage: null
};

type ApiError = {
  response?: {
    data?: {
      error?: string;
    };
  };
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProfile();
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể tải thông tin hồ sơ';

      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Partial<JobseekerProfile>, { rejectWithValue }) => {
    try {
      return await updateUserProfile(profileData);
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể cập nhật hồ sơ';

      return rejectWithValue(errorMessage);
    }
  }
);

export const addProfileEducation = createAsyncThunk(
  'profile/addEducation',
  async (educationData: EducationInput, { rejectWithValue }) => {
    try {
      return await addEducation(educationData);
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể thêm thông tin giáo dục';

      return rejectWithValue(errorMessage);
    }
  }
);
export const removeEducation = createAsyncThunk(
  'profile/removeEducation',
  async (educationId: string, { rejectWithValue }) => {
    try {
      return await deleteEducation(educationId);
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể xóa thông tin học vấn';

      return rejectWithValue(errorMessage);
    }
  }
);

export const addProfileExperience = createAsyncThunk(
  'profile/addExperience',
  async (experienceData: ExperienceInput, { rejectWithValue }) => {
    try {
      return await addExperience(experienceData);
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể thêm kinh nghiệm làm việc';

      return rejectWithValue(errorMessage);
    }
  }
);

export const removeExperience = createAsyncThunk(
  'profile/removeExperience',
  async (experienceId: string, { rejectWithValue }) => {
    try {
      return await deleteExperience(experienceId);
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể xóa kinh nghiệm làm việc';

      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadProfileCV = createAsyncThunk(
  'profile/uploadCV',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await uploadCV(formData);
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể tải CV lên';

      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProfileCV = createAsyncThunk(
  'profile/deleteCV',
  async (_, { rejectWithValue }) => {
    try {
      return await deleteCV();
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể xóa CV';

      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadProfileAvatar = createAsyncThunk(
  'profile/uploadAvatar',
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const result = await uploadAvatar(formData);
      // Update avatar in user state
      dispatch(updateUserAvatar(result));
      return result;
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể tải ảnh đại diện lên';

      return rejectWithValue(errorMessage);
    }
  }
);

export const resetProfileAvatar = createAsyncThunk(
  'profile/resetAvatar',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await resetAvatar();
      // Reset avatar in user state to default
      dispatch(
        updateUserAvatar({
          avatar: 'default-avatar.jpg',
          avatarUrl: '/uploads/avatars/default-avatar.jpg',
        })
      );
      return result;
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể đặt lại ảnh đại diện';

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllProfiles = createAsyncThunk(
  'profile/fetchAllProfiles',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProfiles();
    } catch (error: unknown) {
      // Type guard to check if error is an ApiError
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể tải danh sách hồ sơ';

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'profile/fetchProfileById',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await getProfileById(userId);
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể tải thông tin hồ sơ';

      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await deleteProfileApi();
    } catch (error: unknown) {
      const isApiError = (err: unknown): err is ApiError =>
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as ApiError).response?.data?.error === 'string';

      const errorMessage = isApiError(error)
        ? error.response?.data?.error
        : error instanceof Error
        ? error.message
        : 'Không thể xóa hồ sơ';

      return rejectWithValue(errorMessage);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileErrors: (state) => {
      state.error = null;
    },
    clearProfileMessages: (state) => {
      state.successMessage = null;
    },
    resetProfile: (state) => {
      state.profile = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Hồ sơ đã được cập nhật thành công';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add education
      .addCase(addProfileEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfileEducation.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Đã thêm thông tin học vấn';
      })
      .addCase(addProfileEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove education
      .addCase(removeEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEducation.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Đã xóa thông tin học vấn';
      })
      .addCase(removeEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add experience
      .addCase(addProfileExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProfileExperience.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Đã thêm kinh nghiệm làm việc';
      })
      .addCase(addProfileExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove experience
      .addCase(removeExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeExperience.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = 'Đã xóa kinh nghiệm làm việc';
      })
      .addCase(removeExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Upload CV
      .addCase(uploadProfileCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileCV.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.cvFile = action.payload.fileName;
        }
        state.successMessage = 'CV đã được cập nhật thành công';
      })
      .addCase(uploadProfileCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete CV
      .addCase(deleteProfileCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfileCV.fulfilled, (state) => {
        state.loading = false;
        if (state.profile) {
          state.profile.cvFile = '';
        }
        state.successMessage = 'CV đã được xóa';
      })
      .addCase(deleteProfileCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Upload avatar không cập nhật vào profile state mà sẽ cập nhật vào auth state
      .addCase(uploadProfileAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileAvatar.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Ảnh đại diện đã được cập nhật';
      })
      .addCase(uploadProfileAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Reset avatar
      .addCase(resetProfileAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetProfileAvatar.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = 'Đã đặt lại ảnh đại diện mặc định';
      })
      .addCase(resetProfileAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch all profiles
      .addCase(fetchAllProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProfiles.fulfilled, (state, action: PayloadAction<JobseekerProfile[]>) => {
        state.loading = false;
        state.publicProfiles = action.payload;
      })
      .addCase(fetchAllProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch profile by ID
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.viewingProfile = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action: PayloadAction<JobseekerProfile>) => {
        state.loading = false;
        state.viewingProfile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.successMessage = 'Hồ sơ và tài khoản đã được xóa';
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileErrors, clearProfileMessages, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;