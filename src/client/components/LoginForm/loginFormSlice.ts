import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  isAuth: false,
  isOpen: false,
  userName: '',
  authCounter: 0,
};

export const loginFormSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },

    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },

    authCounterIncrement(state, action) {
      state.authCounter += action.payload;
    },

  },
});