import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './presentations/App';

import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import { createStore } from 'redux';
import reducer from './reducers/index';
const store = createStore(reducer);

// console.log('State:', store.getState());
// console.log('Counter state:', store.getState().counter);
// console.log('Grid state:', store.getState().grid);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
