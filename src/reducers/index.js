import { combineReducers } from 'redux';
import animation from './animation';
import grid from './grid/';
import player from './player';
import messages from './messages';

export default combineReducers({
  animation,
  grid,
  player,
  messages
});
