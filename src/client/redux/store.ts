import {configureStore} from '@reduxjs/toolkit';
import snackbar from './snackbarSlice';
import auth from './authSlice';
import news from './newsSlice';


const rootReducer = {
  reducer: {
    snackbar,
    auth,
    news,
  },
};
const store = configureStore(rootReducer);

declare module 'react-redux' {
  interface DefaultRootState extends ReturnType<typeof store.getState> {
  }
}

export {store, rootReducer};