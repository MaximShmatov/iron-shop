import { configureStore } from '@reduxjs/toolkit';
import snackbar from './snackbarSlice';
import auth from './authSlice';
import news from './newsSlice';

export const store = configureStore({
  reducer: {
    snackbar,
    auth,
    news,
  },
});

declare module 'react-redux' {
  interface DefaultRootState extends ReturnType<typeof store.getState> {}
}