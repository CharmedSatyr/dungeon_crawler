import { /* GRID_HEIGHT,*/ GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';

// Position reducers
const position = (state = 21, action) => {
  // Current player position
  switch (action.type) {
    case 'UPDATE_POSITION':
      console.log('New Position:', action.index);
      return action.index;
    case 'MOVE_EAST':
      if ((state + 1) % GRID_WIDTH !== 0) {
        return state + 1;
      } else {
        return state;
      }
    case 'MOVE_SOUTH':
      if (state + GRID_WIDTH <= TOTAL_CELLS) {
        return state + GRID_WIDTH;
      } else {
        return state;
      }
    case 'MOVE_WEST':
      if (state % GRID_WIDTH !== 0) {
        return state - 1;
      } else {
        return state;
      }
    case 'MOVE_NORTH':
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
