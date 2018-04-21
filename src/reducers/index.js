import { combineReducers } from 'redux';
import grid from './grid/';
import player from './player';
import messages from './messages';

export default combineReducers({
  grid,
  player,
  messages
});
