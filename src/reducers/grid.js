import _ from 'lodash';
import * as c from '../constants/settings';
import * as t from '../constants/action-types';

// 1. Create an empty grid with the desired keys
let gridData = [];

for (let i = 0; i < c.GRID_HEIGHT; i++) {
  let x,
    y = i;
  for (let j = 0; j < c.GRID_WIDTH; j++) {
    x = j;
    gridData.push({
      coordinates: { x, y },
      player: false, // designated player character
      opacity: 1, // _.random(0.4, 0.9), // Opacity for styling
      type: 0
    });
  }
}

// 2. Random values for the first room
const [min, max] = c.ROOM_SIZE_RANGE;
console.log('min, max:', '[' + min + ', ' + max + ']');

const firstRoom = {
  x: _.random(1, c.GRID_WIDTH - max), // x top corner placement
  y: _.random(1, c.GRID_HEIGHT - max), // y top corner placement
  height: _.random(min, max), // height of first room
  width: _.random(min, max) // width of first room
};
console.log('firstRoom Dimensions: ', '[' + firstRoom.height + ', ' + firstRoom.width + ']');
console.log('firstRoom top corner: ', '[' + firstRoom.x + ', ' + firstRoom.y + ']');

// 3. place the first room onto the grid
const placeCells = (gridData, { x = 0, y = 0, height = 1, width = 1 }, type = 'floor') => {
  for (let i in gridData) {
    if (
      gridData[i].coordinates.x >= x &&
      gridData[i].coordinates.x < x + width &&
      gridData[i].coordinates.y >= y &&
      gridData[i].coordinates.y < y + height
    ) {
      gridData[i].type = type;
    }
  }
  return gridData;
};
gridData = placeCells(gridData, firstRoom);

// 4. place additional rooms based on that seed.
const createRoomsFromSeed = (gridData, { x, y, height, width }, range = c.ROOM_SIZE_RANGE) => {
  const [min, max] = range;

  // Generated room values for each edge of the seed room
  const roomValues = [];

  // Make rooms north of the seed
  const north = { height: _.random(min, max), width: _.random(min, max) };
  north.x = _.random(x, x + width - 1);
  north.y = y - north.height - 1;
  north.door = {};
  north.door.x = _.random(north.x, Math.min(north.x + north.width + x + width) - 1);
  north.door.y = y - 1;
  roomValues.push(north);

  const placedRooms = [];
  roomValues.forEach(room => {
    // place room
    gridData = placeCells(gridData, room);
    // place door
    gridData = placeCells(gridData, { x: room.door.x, y: room.door.y }, 'floor');
    // ned placed room values for the next seeds
    placedRooms.push(room);
  });
  console.log('createRoomsFromSeed output: ', { gridData, placedRooms });
};
createRoomsFromSeed(gridData, firstRoom);

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
