import { Provider } from 'react-redux';
import People from './src/components/people';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <People />
    </Provider>
  );
}
