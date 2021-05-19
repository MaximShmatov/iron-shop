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

type TRootSate = ReturnType<typeof store.getState>;

declare module 'react-redux' {
  interface DefaultRootState extends TRootSate {
  }
}

const getStore = (state?: TRootSate) => {
  return state ? configureStore({...rootReducer, preloadedState: state}) : store;
};

export {getStore, TRootSate};