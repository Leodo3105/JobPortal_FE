import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSavedJobs, saveJob, unsaveJob } from '../../services/savedJobService';
import { SavedJob } from '../../types/job';

interface SavedJobsState {
  savedJobs: SavedJob[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedJobsState = {
  savedJobs: [],
  loading: false,
  error: null
};

type ApiError = {
  response?: {
    data?: {
      error?: string;
    };
  };
};

// Thunks
export const fetchSavedJobs = createAsyncThunk(
  'savedJobs/fetchSavedJobs',
  async (_, { rejectWithValue }) => {
    try {
      return await getSavedJobs();
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
        : 'Không thể tải danh sách việc làm đã lưu';

      return rejectWithValue(errorMessage);
    }
  }
);

export const addSavedJob = createAsyncThunk(
  'savedJobs/addSavedJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      await saveJob(jobId);
      return jobId;
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
        : 'Không thể lưu việc làm';

      return rejectWithValue(errorMessage);
    }
  }
);

export const removeSavedJob = createAsyncThunk(
  'savedJobs/removeSavedJob',
  async (
    { jobId, savedJobId }: { jobId: string; savedJobId: string },
    { rejectWithValue }
  ) => {
    try {
      await unsaveJob(jobId);
      return savedJobId;
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
        : 'Không thể xóa việc làm đã lưu';

      return rejectWithValue(errorMessage);
    }
  }
);

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {
    resetSavedJobs: (state) => {
      state.savedJobs = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch saved jobs
      .addCase(fetchSavedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action: PayloadAction<SavedJob[]>) => {
        state.savedJobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove saved job
      .addCase(removeSavedJob.fulfilled, (state, action) => {
        state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
      });
  }
});

export const { resetSavedJobs } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;