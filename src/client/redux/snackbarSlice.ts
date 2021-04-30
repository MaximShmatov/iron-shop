import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

const sliderSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {

    setMessage(state, action) {
      state.message = action.payload;
    },

  },
});

export const { setMessage } = sliderSlice.actions;
export default sliderSlice.reducer;