/* eslint-disable no-shadow */
import { createTheme } from '@mui/material';
import people from './people';

const themeProps = {
  my: {
    people,
  },
};

type th = typeof themeProps;

declare module '@mui/material/styles' {
  interface Theme extends th {
    no?: string;
  }
  interface ThemeOptions extends th {
    no?: string;
  }
}
declare module '@mui/system' {
  interface Theme extends th {
    no?: string;
  }
  interface ThemeOptions extends th {
    no?: string;
  }
}

const appTheme = createTheme(themeProps);

export default appTheme;
