import { createStore, applyMiddleware } from 'redux';
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducer from './reducers/index';

const middlewares = [thunk, batchDispatchMiddleware];

// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(logger);
// }

export const store = createStore(enableBatching(reducer, applyMiddleware(...middlewares)));
export const { getState } = store;
