import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newsList: [],
};

const sliderSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {

    setNewsList(state, action) {
      state.newsList = action.payload;
    },

  },
});

export const { setNewsList } = sliderSlice.actions;
export default sliderSlice.reducer;