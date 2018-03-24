import { combineReducers } from 'redux';
import cell from './cell';
import counter from './counter';

export default combineReducers({
  cell,
  counter
});
