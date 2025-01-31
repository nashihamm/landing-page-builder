// frontend/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;