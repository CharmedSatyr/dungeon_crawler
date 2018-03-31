import { GRID_HEIGHT, GRID_WIDTH } from '../constants/settings';
import * as t from '../constants/action-types';

// Create a grid
export const gridData = [];

for (let i = 0; i < GRID_HEIGHT; i++) {
  let x,
    y = i;
  for (let j = 0; j < GRID_WIDTH; j++) {
    x = j;
    gridData.push({
      coordinates: { x, y },
      player: false // designated player character
    });
  }
}

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    case t.SET_COORDINATES:
      return state.map((cell, index) => {
        // Set cell as player
        if (cell.coordinates.x === action.x && cell.coordinates.y === action.y) {
          return Object.assign({}, cell, {
            player: true
          });
          // Only one player at a time
        } else {
          return Object.assign({}, cell, {
            player: false
          });
        }
      });
    default:
      return state;
  }
};

export default grid;
