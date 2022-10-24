import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Checkbox, IconButton, Input } from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { noNaN } from '../../../../server/util';
import store, { useAppSelector } from '../../../store';
import { IPerson, peopleActions } from '../../../store/peopleSlice';

interface IPersonComponent {
  createMode?: boolean;
  person?: IPerson;
}

const Person = ({ createMode, person }: IPersonComponent) => {
  const initialState = useMemo(() => person ?? { _id: '', age: 0, name: '' }, [person]);
  const [state, setState] = useState<IPerson>(initialState);
  const visibility =
    state.age !== initialState.age || state.name !== initialState.name ? 'visible' : 'hidden';
  const handleOkClick = React.useCallback(() => {
    if (createMode) {
      store
        .dispatch(peopleActions.create(state))
        .unwrap()
        .then((res) => {
          if (res) {
            void store.dispatch(peopleActions.loadAll());
            setState(initialState);
          }
        })
        .catch(() => {});
    } else {
      void store.dispatch(peopleActions.update(state));
    }
  }, [createMode, initialState, state]);
  const isSelected = useAppSelector((global) =>
    global.peopleSlice.selectedPeople.includes(state._id),
  );

  return (
    <Box sx={(theme) => ({ ...theme.my.people.person(theme) })}>
      <form
        action=""
        onSubmit={(ev) => {
          ev.preventDefault();
          if (visibility === 'visible' || createMode) {
            handleOkClick();
          }
        }}>
        <Checkbox
          checked={isSelected}
          onChange={() => void store.dispatch(peopleActions.select(state._id))}
          disabled={createMode}
        />
        <Input
          value={state.name}
          onChange={(ev) => setState((current) => ({ ...current, name: ev.target.value }))}
        />
        <Input
          value={state.age}
          onChange={(ev) => setState((current) => ({ ...current, age: noNaN(ev.target.value) }))}
        />
        <Box className="person__buttons" visibility={visibility}>
          <IconButton type="button" size="small" onClick={() => setState(initialState)}>
            <ClearIcon color="error" />
          </IconButton>
          <IconButton size="small" type="submit">
            <CheckIcon color="success" />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default Person;
