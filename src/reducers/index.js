import { combineReducers } from 'redux';
import grid from './grid';
import player from './player';

export default combineReducers({
  grid,
  player
});
