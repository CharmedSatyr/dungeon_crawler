import { /* GRID_HEIGHT, */ GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';
import * as t from '../constants/action-types';

// Create a grid
export const gridData = [];
const populate = number => {
  for (let i = 0; i < number; i++) {
    gridData.push({
      player: false, // designated player character
      nearby: false, // within player character's view
      explored: false // player has been nearby
    });
  }
};

// Populate the grid from settings
populate(TOTAL_CELLS);

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    // Toggle whether cell is player
    case t.TOGGLE_CELL:
      return state.map((cell, index) => {
        // Activate cell as player
        if (index === action.index) {
          return Object.assign({}, cell, {
            player: !cell.player
          });
        }
        // Deactivate others
        // If it's not the player
        if (index !== action.index) {
          /*** RIGHT ***/
          // If index is one or two cells higher and not on another line
          if (
            (index === action.index + 1 && index % GRID_WIDTH !== 0) ||
            (index === action.index + 2 && index % GRID_WIDTH !== 0 && index % GRID_WIDTH !== 1)
          ) {
            // It is nearby and explored
            return Object.assign({}, cell, {
              player: false,
              nearby: true,
              explored: true
            });
          }
          // If it's on the same row and more than 2 cells to the right
          if (index > action.index + 2 && index % GRID_WIDTH !== 0) {
            // It's not the player and it's not nearby
            return Object.assign({}, cell, {
              player: false,
              nearby: false
            });
          }
          /*** LEFT ***/
          // If index is one or two cells lower and not on another line
          if (
            (index === action.index - 1 && index % GRID_WIDTH !== GRID_WIDTH - 1) ||
            (index === action.index - 2 &&
              index % GRID_WIDTH !== GRID_WIDTH - 1 &&
              index % GRID_WIDTH !== GRID_WIDTH - 2)
          ) {
            // It is nearby and explored
            return Object.assign({}, cell, {
              player: false,
              nearby: true,
              explored: true
            });
          }
          // If it's on the same row and more than 2 cells to the left
          if (
            index < action.index - 2 &&
            index % GRID_WIDTH !== GRID_WIDTH - 1 &&
            index % GRID_WIDTH !== GRID_WIDTH - 2
          ) {
            // It's not the player and it's not nearby
            return Object.assign({}, cell, {
              player: false,
              nearby: false
            });
          }
          // Otherwise, the cell is not the player
          return Object.assign({}, cell, {
            player: false
          });
        }
        // if one or two cells lower index, exists, and not on another line
        // if one GRID_WIDTH cells higher index, +/- 1, exists, and not past the edge
        // if one GRID_WIDTH cells lower index, +/- 1, exists, and not past the edge
        return cell;
      });
    // Move player one cell right
    case t.MOVE_EAST:
      return state.map((cell, index) => {
        // Deactivate the current cell if the next cell isn't on another line.
        if (index === action.position && (index + 1) % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            player: false
          });
        }
        // Activate the next cell if that next cell isn't on another line.
        if (index === action.position + 1 && index % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            player: true
          });
        }
        return cell;
      });
    // Move player one cell down
    case t.MOVE_SOUTH:
      return state.map((cell, index) => {
        // Deactivate the current cell if the cell below exists
        if (index === action.position && index + GRID_WIDTH <= TOTAL_CELLS) {
          return Object.assign({}, cell, {
            player: false
          });
        }
        // Activate the cell below if it exists
        if (index === action.position + GRID_WIDTH) {
          return Object.assign({}, cell, {
            player: true
          });
        }
        return cell;
      });
    // Move player one cell left
    case t.MOVE_WEST:
      return state.map((cell, index) => {
        // Deactivate the current cell if it's not the first on the row
        if (index === action.position && index % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            player: false
          });
        }
        // Activate the previous cell if the current cell isn't the first on the row
        if (index === action.position - 1 && action.position % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            player: true
          });
        }
        return cell;
      });
    // Move player one cell up
    case t.MOVE_NORTH:
      return state.map((cell, index) => {
        // Deactivate the current cell if the cell above exists
        if (index === action.position && index - GRID_WIDTH >= 0) {
          return Object.assign({}, cell, {
            player: false
          });
        }
        // Activate the cell above if it exists
        if (index === action.position - GRID_WIDTH) {
          return Object.assign({}, cell, {
            player: true
          });
        }
        return cell;
      });
    default:
      return state;
  }
};

export default grid;
