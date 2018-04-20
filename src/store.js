import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

export const store = createStore(reducer, applyMiddleware(thunk));
export const getState = store.getState;

console.log('Initial state:', store.getState());
