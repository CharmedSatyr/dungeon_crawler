import { combineReducers } from 'redux';
import counter from './counter';
import grid from './grid';
import position from './position';

export default combineReducers({
  counter,
  grid,
  position
});
