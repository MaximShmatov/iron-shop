import {createSlice} from '@reduxjs/toolkit';


export type TModalWindowState = {
  isOpenWindow: boolean | null | undefined;
  componentName: string;
};

export const initialState: TModalWindowState = {
  isOpenWindow: null,
  componentName: 'loginForm',
};

export const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {

    setModalWindow(state, action) {
      if (typeof action.payload === 'boolean' || action.payload === null) {
        state.isOpenWindow = action.payload;
      } else {
        state.isOpenWindow = undefined;
        state.componentName = action.payload;
      }
    },

  },
});