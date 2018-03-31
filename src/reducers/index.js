import { combineReducers } from 'redux';
import grid from './grid';
import coordinates from './coordinates';

export default combineReducers({
  coordinates,
  grid
});
