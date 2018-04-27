import { createStore, applyMiddleware } from 'redux';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/index';

const middleware0 = [thunk, batchDispatchMiddleware];
const middleware1 = [];

if (process.env.NODE_ENV !== 'production') {
  middleware1.push(logger);
}

export const store = createStore(
  enableBatching(reducer, applyMiddleware(...middleware0)),
  applyMiddleware(...middleware1)
);

export const { getState } = store;
