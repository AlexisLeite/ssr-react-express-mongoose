import { Theme } from '@mui/system';

const mainLayout = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  my: theme.spacing(3),
  maxWidth: 'sm',
});

export default mainLayout;
