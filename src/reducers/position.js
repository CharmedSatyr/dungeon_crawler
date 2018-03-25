import { /* GRID_HEIGHT,*/ GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';
import * as t from '../constants/action-types';

// Position reducers
const position = (state = 21, action) => {
  // Current player position
  switch (action.type) {
    case t.UPDATE_POSITION:
      return action.index;
    case t.MOVE_EAST:
      if ((state + 1) % GRID_WIDTH !== 0) {
        return state + 1;
      } else {
        return state;
      }
    case t.MOVE_SOUTH:
      if (state + GRID_WIDTH <= TOTAL_CELLS) {
        return state + GRID_WIDTH;
      } else {
        return state;
      }
    case t.MOVE_WEST:
      if (state % GRID_WIDTH !== 0) {
        return state - 1;
      } else {
        return state;
      }
    case t.MOVE_NORTH:
      if (state - GRID_WIDTH >= 0) {
        return state - GRID_WIDTH;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default position;
