import { createStore, applyMiddleware } from 'redux';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/index';

const middlewares1 = [thunk, batchDispatchMiddleware];
const middlewares2 = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares2.push(logger);
}

export const store = createStore(
  enableBatching(reducer, applyMiddleware(...middlewares1)),
  applyMiddleware(...middlewares2)
);

export const { getState } = store;
