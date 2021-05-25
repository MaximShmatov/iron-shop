import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minValue: -15,
  maxValue: 90,
  valueFrom: 2,
  valueTo: 45,
  stepSize: 1,
  isRange: true,
  isVertical: false,
  hasTooltip: true,
  hasScale: true,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {

    setMinValue(state, action) {
      const min = action.payload;
      let { minValue, maxValue, valueFrom, stepSize } = state;
      if (min < valueFrom) {
        const step = Math.round((valueFrom - min) / stepSize) * stepSize;
        minValue = valueFrom - step;
      } else minValue = valueFrom;
      if (minValue === maxValue) minValue -= stepSize;
      return {...state, minValue, maxValue, valueFrom, stepSize};
    },

    setMaxValue(state, action) {
      const max = action.payload;
      let { minValue, maxValue, valueFrom, valueTo, stepSize, isRange } = state;
      if (isRange && max <= valueTo) maxValue = valueTo;
      else if (max <= valueFrom) maxValue = valueFrom;
      else {
        maxValue = Math.round((max - minValue) / stepSize);
        maxValue = maxValue * stepSize + minValue;
      }
      if (maxValue === minValue) maxValue += stepSize;
      return {...state, minValue, maxValue, valueFrom, valueTo, stepSize, isRange};
    },

    setValueFrom(state, action) {
      const from = action.payload;
      let { minValue, maxValue, valueFrom, valueTo, stepSize, isRange } = state;
      if (from <= minValue) valueFrom = minValue;
      else if (isRange && from >= valueTo) valueFrom = valueTo;
      else if (from >= maxValue) valueFrom = maxValue;
      else {
        valueFrom = Math.round((from - minValue) / stepSize);
        valueFrom = valueFrom * stepSize + minValue;
      }
      return {...state, minValue, maxValue, valueFrom, valueTo, stepSize, isRange};
    },

    setValueTo(state, action) {
      if (state.isRange) {
        const to = action.payload;
        let { maxValue, valueFrom, valueTo, stepSize } = state;
        if (to > valueFrom && to < maxValue) {
          valueTo = Math.round((to - valueFrom) / stepSize);
          valueTo = valueTo * stepSize + valueFrom;
        } else if (to >= maxValue) {
          valueTo = maxValue;
        } else valueTo = valueFrom;
        return {...state, maxValue, valueFrom, valueTo, stepSize};
      }
    },

    setStepSize(state, action) {
      let { minValue, maxValue, valueFrom, valueTo, stepSize, isRange } = state;
      const maxStep = Math.abs(maxValue - minValue);
      stepSize = Math.abs(Math.round(action.payload));

      if (stepSize >= maxStep) stepSize = maxStep;
      while (maxStep % stepSize !== 0) {
        stepSize -= 1;
        if (stepSize < 1) {
          stepSize = 1;
          break;
        }
      }

      const calcStep = (value: number) => {
        const valToStep = Math.round((value - minValue) / stepSize);
        return valToStep * stepSize + minValue;
      };

      if (valueFrom > minValue) valueFrom = calcStep(valueFrom);
      else valueFrom = minValue;
      if (isRange) {
        if (valueTo > valueFrom) valueTo = calcStep(valueTo);
        else valueTo = valueFrom;
      }
      return {...state, minValue, maxValue, valueFrom, valueTo, stepSize, isRange};
    },

    setIsRange(state, action) {
      const isRange = action.payload;
      let { maxValue, valueFrom, valueTo } = state;
      if (isRange) {
        if (valueTo > maxValue) valueTo = maxValue;
        if (valueTo < valueFrom) valueTo = valueFrom;
      }
      return {...state, maxValue, valueFrom, valueTo, isRange};
    },

    setIsVertical(state, action) {
      state.isVertical = action.payload;
    },

    setHasTooltip(state, action) {
      state.hasTooltip = action.payload;
    },

    setHasScale(state, action) {
      state.hasScale = action.payload;
    },
  },
});

export const {
  setMinValue,
  setMaxValue,
  setValueFrom,
  setValueTo,
  setStepSize,
  setIsRange,
  setIsVertical,
  setHasTooltip,
  setHasScale,
} = sliderSlice.actions;
export default sliderSlice.reducer;