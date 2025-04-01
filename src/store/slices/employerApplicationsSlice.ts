import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getJobApplications, 
  getApplicationDetail, 
  updateApplicationStatus, 
  scheduleInterview, 
  addApplicationNote 
} from '../../services/applicationService';
import { Application } from '../../types/application';

interface EmployerApplicationsState {
  applications: Application[];
  currentApplication: Application | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: EmployerApplicationsState = {
  applications: [],
  currentApplication: null,
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

// Thunks
export const fetchJobApplications = createAsyncThunk(
  'employerApplications/fetchJobApplications',
  async (jobId: string, { rejectWithValue }) => {
    try {
      return await getJobApplications(jobId);
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
        : 'Không thể tải danh sách ứng viên';

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchApplicationDetail = createAsyncThunk(
  'employerApplications/fetchApplicationDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getApplicationDetail(id);
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
        : 'Không thể tải thông tin ứng viên';

      return rejectWithValue(errorMessage);
    }
  }
);

export const changeApplicationStatus = createAsyncThunk(
  'employerApplications/changeApplicationStatus',
  async (
    {
      applicationId,
      status,
      feedback,
    }: {
      applicationId: string;
      status: 'pending' | 'viewed' | 'interview' | 'accepted' | 'rejected';
      feedback?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await updateApplicationStatus(applicationId, status, feedback);
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
        : 'Không thể cập nhật trạng thái ứng viên';

      return rejectWithValue(errorMessage);
    }
  }
);

export const setInterviewSchedule = createAsyncThunk(
  'employerApplications/setInterviewSchedule',
  async (
    {
      applicationId,
      interviewData,
    }: {
      applicationId: string;
      interviewData: {
        date: string;
        location: string;
        type: 'in-person' | 'phone' | 'video';
        notes?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      return await scheduleInterview(applicationId, interviewData);
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
        : 'Không thể lên lịch phỏng vấn';

      return rejectWithValue(errorMessage);
    }
  }
);

export const addNote = createAsyncThunk(
  'employerApplications/addNote',
  async (
    { applicationId, content }: { applicationId: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      return await addApplicationNote(applicationId, content);
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
        : 'Không thể thêm ghi chú';

      return rejectWithValue(errorMessage);
    }
  }
);

const employerApplicationsSlice = createSlice({
  name: 'employerApplications',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch job applications
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch application detail
      .addCase(fetchApplicationDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationDetail.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.currentApplication = action.payload;
      })
      .addCase(fetchApplicationDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Change application status
      .addCase(changeApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeApplicationStatus.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.currentApplication = action.payload;
        
        // Update in applications list if exists
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        
        state.successMessage = `Đã cập nhật trạng thái ứng viên thành ${action.payload.status}`;
      })
      .addCase(changeApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Set interview schedule
      .addCase(setInterviewSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(setInterviewSchedule.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.currentApplication = action.payload;
        
        // Update in applications list if exists
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        
        state.successMessage = 'Đã lên lịch phỏng vấn thành công';
      })
      .addCase(setInterviewSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add note
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Application>) => {
        state.loading = false;
        state.currentApplication = action.payload;
        
        // Update in applications list if exists
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        
        state.successMessage = 'Đã thêm ghi chú thành công';
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearErrors, clearMessages, clearCurrentApplication } = employerApplicationsSlice.actions;
export default employerApplicationsSlice.reducer;