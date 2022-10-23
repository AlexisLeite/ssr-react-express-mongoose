import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  initialState: {
    count: 0,
  },
  name: 'counterSlice',
  reducers: {
    sum(state, { payload }: PayloadAction<number>) {
      state.count += payload;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
