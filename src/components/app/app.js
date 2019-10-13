import React from 'react';
import { Board } from 'components';
import { Provider } from 'react-redux';
import store from 'store';

const App = () => (
  <Provider store={store}>
    <Board />
  </Provider>
);

export default App;
