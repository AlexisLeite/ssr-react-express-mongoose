import { Theme } from '@mui/system';

const people = {
  manager: (theme: Theme) => ({
    margin: `${theme.spacing(6)} 0`,
    '.paper': {
      p: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },

    '.actions': {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  person: (theme: Theme) => ({
    form: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      margin: 0,
    },

    '.person__buttons': {
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing(1),
    },
  }),
};

export default people;
