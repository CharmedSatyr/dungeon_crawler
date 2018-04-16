import { gridData } from './grid.generator';
import * as t from '../constants/action-types';

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    case t.SET_COORDINATES:
      return state.map((cell, index) => {
        // Set cell as player
        if (cell.coordinates.x === action.x && cell.coordinates.y === action.y) {
          return Object.assign({}, cell, {
            player: {
              direction: action.direction
            }
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
