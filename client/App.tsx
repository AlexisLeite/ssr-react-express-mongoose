import React from 'react';
import { Provider } from 'react-redux';
import Counter from './src/components/Counter';
import store from './store';

export default function App() {
  return <Provider store={store}>
    <Counter />
  </Provider>;
}
