import { /* GRID_HEIGHT, */ GRID_WIDTH, TOTAL_CELLS } from '../constants/settings';

// Create a grid
export const gridData = [];
const populate = number => {
  for (let i = 0; i < number; i++) {
    gridData.push({
      alive: false
    });
  }
};

// Populate the grid from settings
populate(TOTAL_CELLS);

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    case 'TOGGLE_CELL':
      return state.map((cell, index) => {
        // Activate cell on click
        if (index === action.index) {
          return Object.assign({}, cell, {
            alive: !cell.alive
          });
        }
        // Deactivate others
        if (index !== action.index) {
          return Object.assign({}, cell, {
            alive: false
          });
        }
        return cell;
      });
    case 'MOVE_EAST':
      return state.map((cell, index) => {
        // Deactivate the current cell if the next cell isn't on another line.
        if (index === action.position && (index + 1) % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            alive: false
          });
        }
        // Activate the next cell if that next cell isn't on another line.
        if (index === action.position + 1 && index % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            alive: true
          });
        }
        return cell;
      });
    case 'MOVE_SOUTH':
      return state.map((cell, index) => {
        // Deactivate the current cell if the cell below exists
        if (index === action.position && index + GRID_WIDTH <= TOTAL_CELLS) {
          return Object.assign({}, cell, {
            alive: false
          });
        }
        // Activate the cell below if it exists
        if (index === action.position + GRID_WIDTH) {
          return Object.assign({}, cell, {
            alive: true
          });
        }
        return cell;
      });
    case 'MOVE_WEST':
      return state.map((cell, index) => {
        // Deactivate the current cell if it's not the first on the row
        if (index === action.position && index % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            alive: false
          });
        }
        // Activate the previous cell if the current cell isn't the first on the row
        if (index === action.position - 1 && action.position % GRID_WIDTH !== 0) {
          return Object.assign({}, cell, {
            alive: true
          });
        }
        return cell;
      });
    case 'MOVE_NORTH':
      return state.map((cell, index) => {
        // Deactivate the current cell if the cell above exists
        if (index === action.position && index - GRID_WIDTH >= 0) {
          return Object.assign({}, cell, {
            alive: false
          });
        }
        // Activate the cell above if it exists
        if (index === action.position - GRID_WIDTH) {
          return Object.assign({}, cell, {
            alive: true
          });
        }
        return cell;
      });
    default:
      return state;
  }
};

export default grid;
