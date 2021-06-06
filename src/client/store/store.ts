import {configureStore} from '@reduxjs/toolkit';
import {modalWindowSlice} from '../components/ModalWindow/modalWindowSlice';
import snackbar from './snackbarSlice';
import auth from './authSlice';
import news from './newsSlice';
import slider from '../components/Slider/rangeSliderSlice';


const rootReducer = {
  reducer: {
    modalWindow: modalWindowSlice.reducer,
    snackbar,
    auth,
    news,
    slider,
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