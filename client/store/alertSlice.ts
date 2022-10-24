import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

interface IAlert {
  id: string;
  message: string;
  type: 'error' | 'warning';
}

interface IAlertState {
  alerts: IAlert[];
}

const alertSlice = createSlice({
  initialState: {
    alerts: [],
  } as IAlertState,
  name: 'alertSlice',
  reducers: {
    close(state, { payload }: PayloadAction<string>) {
      state.alerts = state.alerts.filter((current) => current.id !== payload);
    },
    notify(state, { payload }: PayloadAction<Omit<IAlert, 'id'>>) {
      state.alerts.push({ id: uniqueId(), ...payload });
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
