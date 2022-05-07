import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../src/styles/index.scss';
import App from './App';
import { setupStore } from './redux/store';

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
