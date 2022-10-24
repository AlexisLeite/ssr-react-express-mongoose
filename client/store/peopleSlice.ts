/* eslint-disable no-underscore-dangle */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import api, { makeApiUrl } from '../src/common/api';

export interface IPerson {
  _id: string;
  name: string;
  age: number;
}

interface IPeopleState {
  isLoading: boolean;
  people: IPerson[];
  selectedPeople: string[];
}

const loadAll = createAsyncThunk('peopleSlice/loadAll', async () => {
  const result = await api.get<IPerson[]>(makeApiUrl('person'));

  return result?.data;
});

const create = createAsyncThunk<IPerson | null, Omit<IPerson, '_id'>>(
  'peopleSlice/create',
  async (payload, { dispatch }) => {
    const result = await api.post<IPerson>(makeApiUrl('person'), {
      postData: {
        name: payload.name,
        age: payload.age,
      },
    });

    void dispatch(loadAll());
    return result?.data ?? null;
  },
);

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-invalid-void-type
const deleteSelected = createAsyncThunk<any, void, { state: RootState }>(
  'peopleSlice/deleteSelected',
  async (_, { dispatch, getState }) => {
    const selected = getState().peopleSlice.selectedPeople;
    if (selected.length > 0) {
      await Promise.all(selected.map((current) => api.delete(makeApiUrl(`person/${current}`))));
      void dispatch(loadAll());
    }
  },
);

const update = createAsyncThunk<
  IPerson | null,
  {
    _id: string;
    name: string;
    age: number;
  }
>('peopleSlice/update', async (payload) => {
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
    selectedPeople: [],
  } as IPeopleState,
  name: 'peopleSlice',
  reducers: {
    select(state, { payload }: PayloadAction<string>) {
      if (state.selectedPeople.includes(payload)) {
        state.selectedPeople = state.selectedPeople.filter((current) => current !== payload);
      } else state.selectedPeople = [...state.selectedPeople, payload];
    },
  },
  extraReducers: (builder) => {
    [loadAll, update, deleteSelected, create].forEach((current) => {
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
        state.isLoading = false;
        state.people = payload;
      }
    });

    builder.addCase(update.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.people = state.people.map((current) =>
          current._id === payload._id ? payload : current,
        );
      }
    });
  },
});

export const peopleActions = { ...peopleSlice.actions, create, deleteSelected, loadAll, update };

export default peopleSlice.reducer;
