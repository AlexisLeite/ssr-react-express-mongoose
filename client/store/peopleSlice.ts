/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { makeApiUrl } from '../src/common/api';

export interface IPerson {
  _id: string;
  name: string;
  age: number;
}

interface IPeopleState {
  isLoading: boolean;
  people: IPerson[]
}

const loadAll = createAsyncThunk('peopleSlice/loadAll', async () => {
  const result = await api.get<IPerson[]>(makeApiUrl('person'));

  return result?.data;
});

const update = createAsyncThunk<IPerson | null, {
  _id: string;
  name: string;
  age: number;
}>('peopleSlice/update', async (payload) => {
  const result = await api.patch<IPerson>(makeApiUrl(`person/${payload._id}`), {
    postData: {
      name: payload.name,
      age: payload.age,
    },
  });

  return result?.data ?? null;
});

const peopleSlice = createSlice({
  initialState: {
    isLoading: false,
    people: [],
  } as IPeopleState,
  name: 'peopleSlice',
  reducers: {},
  extraReducers: ((builder) => {
    [loadAll, update].forEach((current) => {
      builder.addCase(current.rejected, (state, { error }) => {
        state.isLoading = false;
        console.error(error);
      });
      builder.addCase(current.pending, (state) => {
        state.isLoading = true;
      });
    });

    builder.addCase(loadAll.fulfilled, (state, { payload }) => {
      if (payload) {
        console.log(payload);
        state.isLoading = false;
        state.people = payload;
      }
    });

    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.people = state.people.map(
          (current) => (current._id === payload._id ? payload : current),
        );
      }
    });
  }),
});

export const peopleActions = { ...peopleSlice.actions, loadAll, update };

export default peopleSlice.reducer;
