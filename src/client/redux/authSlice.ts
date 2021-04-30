import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  authCounter: 0,
};

const sliderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },

    failAuthIncrement(state, action) {
      state.authCounter += action.payload;
    },

  },
});

export const { setIsAuth, failAuthIncrement } = sliderSlice.actions;
export default sliderSlice.reducer;