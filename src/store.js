import { createStore } from 'redux';
import reducer from './reducers/index';

export const store = createStore(reducer);

console.log('Initial state:', store.getState());
