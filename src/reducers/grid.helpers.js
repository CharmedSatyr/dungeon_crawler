import _ from 'lodash';
import * as c from '../constants/settings';

// HELPER FUNCTIONS FOR CREATING THE MAP
// 1. Create an empty grid with the desired keys
export let gridData = [];

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
const isValidRoomPlacement = (gridData, { x, y, width = 1, height = 1 }) => {
  // check if on the edge of or outside of the grid
  if (y < 1 || y + height > c.GRID_HEIGHT) {
    return false;
  }
  if (x < 1 || x + width > c.GRID_WIDTH) {
    return false;
  }

  // check if on or adjacent to existing room
  for (let i in gridData) {
    if (
      gridData[i].coordinates.x >= x - 1 &&
      gridData[i].coordinates.x <= x + width &&
      gridData[i].coordinates.y >= y - 1 &&
      gridData[i].coordinates.y <= y + height
    ) {
      console.log('ROOM PLACEMENT REJECTED!');
      return false;
    }
  }

  // all grid cells are clear
  return true;
};

const createRoomsFromSeed = (gridData, { x, y, height, width }, range = c.ROOM_SIZE_RANGE) => {
  const [min, max] = range;

  // Generated room values for each edge of the seed room
  const roomValues = [];

  // Make rooms north of the seed
  const north = {
    x: _.random(x, x + width - 1),
    height: _.random(min, max),
    width: _.random(min, max),
    door: {
      y: y - 1
    }
  };
  north.y = y - north.height - 1;
  north.door.x = _.random(north.x, Math.min(north.x + north.width + x + width) - 1);
  roomValues.push(north);

  roomValues.forEach(room => {
    if (isValidRoomPlacement(gridData, room)) {
      const placedRooms = [];
      roomValues.forEach(room => {
        // place room
        gridData = placeCells(gridData, room);
        // place door
        gridData = placeCells(gridData, { x: room.door.x, y: room.door.y }, 'floor');
        // push placed room values for the next seeds
        placedRooms.push(room);
      });
      console.log('createRoomsFromSeed output: ', { gridData, placedRooms });
      return { gridData, placedRooms };
    }
  });
};
// const growMap = (gridData, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
//   if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
//     return gridData;
//   }
//
//   gridData = createRoomsFromSeed(gridData, seedRooms.pop());
//   seedRooms.push(...gridData.placedRooms);
//   counter += gridData.placedRooms.length;
//   return growMap(gridData.grid, seedRooms, counter);
// };
// growMap(gridData, [firstRoom]);
