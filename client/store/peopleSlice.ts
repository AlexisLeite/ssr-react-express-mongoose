import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { makeApiUrl } from '../src/common/api';

export interface IPerson {
  name: string;
  age: number;
}

interface IPeopleState {
  isLoading: boolean;
  people: IPerson[]
}

const loadAll = createAsyncThunk('peopleSlice/loadAll', async () => {
  const result = await api.get<IPerson[]>(makeApiUrl('person'));

  console.log(result);

  return result.data;
});

const peopleSlice = createSlice({
  initialState: {
    isLoading: false,
    people: [],
  } as IPeopleState,
  name: 'peopleSlice',
  reducers: {},
  extraReducers: ((builder) => {
    builder.addCase(loadAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadAll.rejected, (state, { error }) => {
      state.isLoading = false;
      console.error(error);
    });
    builder.addCase(loadAll.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.people = payload;
    });
  }),
});

export const peopleActions = { ...peopleSlice.actions, loadAll };

export default peopleSlice.reducer;
