import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/index';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middlewares));
export const getState = store.getState;
