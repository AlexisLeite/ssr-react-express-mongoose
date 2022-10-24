import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import AlertsList from './src/components/AlertsList';
import People from './src/components/people';
import store from './store';
import appTheme from './theme';

export default function App() {
  useEffect(() => {
    console.log(appTheme);
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <Container className="mainContainer" sx={(theme) => ({ ...theme.my.mainLayout(theme) })}>
          <AlertsList />
          <People />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
