// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import savedJobsReducer from './slices/savedJobsSlice';
import notificationReducer from './slices/notificationSlice';
import categoryReducer from './slices/categorySlice';
import employerApplicationsReducer from './slices/employerApplicationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    savedJobs: savedJobsReducer,
    notifications: notificationReducer,
    categories: categoryReducer,
    employerApplications: employerApplicationsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;