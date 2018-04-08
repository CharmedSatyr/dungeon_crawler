import _ from 'lodash';
import * as c from '../constants/settings';
import * as t from '../constants/action-types';

// 1. Create an empty grid
let gridData = [];

for (let i = 0; i < c.GRID_HEIGHT; i++) {
  let x,
    y = i;
  for (let j = 0; j < c.GRID_WIDTH; j++) {
    x = j;
    gridData.push({
      coordinates: { x, y },
      player: false, // designated player character
      opacity: _.random(0.4, 0.9), // Opacity for styling
      type: 0
    });
  }
}

// 2. Random values for the first room
const [min, max] = c.ROOM_SIZE_RANGE;
console.log('min, max:', '[' + min + ', ' + max + ']');

const firstRoom = {
  // x: _.random(1, c.GRID_WIDTH - max),
  // y: _.random(1, c.GRID_HEIGHT - max),
  height: _.random(min, max), // height of first room
  width: _.random(min, max) // width of first room
};
console.log('firstRoom Dimensions: ', '[' + firstRoom.height + ', ' + firstRoom.width + ']');

// 3. place the first room onto the grid
const placeCells = (gridData, { height = 1, width = 1 }, type = 'floor') => {
  for (let i in gridData) {
    if (gridData[i].coordinates.x <= height && gridData[i].coordinates.y <= width) {
      gridData[i].type = type;
    }
  }
  return gridData;
};
gridData = placeCells(gridData, firstRoom);

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    case t.SET_COORDINATES:
      return state.map((cell, index) => {
        // Set cell as player
        if (cell.coordinates.x === action.x && cell.coordinates.y === action.y) {
          return Object.assign({}, cell, {
            player: true,
            opacity: 1
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
