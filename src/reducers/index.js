import { combineReducers } from 'redux';
import cell from './cell';
import counter from './counter';
import grid from './grid';

export default combineReducers({
  cell,
  counter,
  grid
});
