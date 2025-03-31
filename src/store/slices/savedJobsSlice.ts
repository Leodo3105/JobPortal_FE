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

// Thunks
export const fetchSavedJobs = createAsyncThunk(
  'savedJobs/fetchSavedJobs',
  async (_, { rejectWithValue }) => {
    try {
      return await getSavedJobs();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Không thể tải danh sách việc làm đã lưu');
    }
  }
);

export const addSavedJob = createAsyncThunk(
  'savedJobs/addSavedJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      await saveJob(jobId);
      return jobId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Không thể lưu việc làm');
    }
  }
);

export const removeSavedJob = createAsyncThunk(
  'savedJobs/removeSavedJob',
  async ({ jobId, savedJobId }: { jobId: string, savedJobId: string }, { rejectWithValue }) => {
    try {
      await unsaveJob(jobId);
      return savedJobId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Không thể xóa việc làm đã lưu');
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