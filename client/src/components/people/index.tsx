import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { useMount } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import store, { useAppSelector } from '../../../store';
import { peopleActions } from '../../../store/peopleSlice';
import Person from './Person';

const People = () => {
  const people = useAppSelector((global) => global.peopleSlice.people);
  const isLoading = useAppSelector((global) => global.peopleSlice.isLoading);
  const arePeopleSelected = useAppSelector(
    (global) => global.peopleSlice.selectedPeople.length > 0,
  );
  const [addingPerson, setAddingPerson] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!isLoading) {
      setAddingPerson(false);
      if (document.activeElement?.tagName !== 'INPUT') {
        (
          (ref.current as HTMLElement | undefined)?.querySelector('input[type="text"]') as
            | HTMLElement
            | undefined
        )?.focus();
      }
    }
  }, [isLoading]);

  useMount(() => {
    void store.dispatch(peopleActions.loadAll());
  });

  return (
    <Box
      ref={ref}
      sx={(theme) => ({ ...theme.my.people.manager(theme) })}
      className="peopleManager">
      <Paper variant="outlined" className="paper">
        <Typography component="h1" variant="h4" className="title">
          People manager
        </Typography>
        {isLoading && <LinearProgress />}
        <Box className="currentPeople">
          {people.length === 0 ? (
            <Typography>There is no people to show.</Typography>
          ) : (
            people.map((current) => <Person key={current._id} person={current} />)
          )}
          {addingPerson && <Person createMode={true} />}
        </Box>
        <Box className="actions">
          <Button
            variant="outlined"
            disabled={!arePeopleSelected}
            color="error"
            onClick={() => void store.dispatch(peopleActions.deleteSelected())}>
            Delete selected
          </Button>
          <Button variant="contained" onClick={() => setAddingPerson((current) => !current)}>
            {addingPerson ? 'Cancel' : 'Add person'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default People;
