import _ from 'lodash';
import * as c from '../../constants/settings';
import tileTypes from '../../constants/tile-types';

// makeGrid
// Create an empty grid with the desired keys
export const makeGrid = (height, width, type, grid = []) => {
  let index = 0;
  for (let i = 0; i < height; i++) {
    let x,
      y = i;
    for (let j = 0; j < width; j++) {
      x = j;
      grid.push({
        coordinates: { x, y },
        index,
        payload: {},
        type,
      });
      index++;
    }
  }
  return grid;
};

// makeSeed
// Set random values for the first room
export const makeSeed = (gridHeight, gridWidth, range) => {
  const [min, max] = range;
  if (max + 2 > gridHeight || max + 2 > gridWidth) {
    throw new Error(
      'makeSeed Error: Invalid range. Seed room must fit entirely on non-edge grid cells.'
    );
  }
  return {
    x: _.random(1, gridWidth - max - 1), // x top left corner placement
    y: _.random(1, gridHeight - max - 1), // y top left corner placement
    height: _.random(min, max), // height of first room
    width: _.random(min, max), // width of first room
  };
};

// placeRoom
// This function changes the type of the cluster of cells that fits that coordinates/dimensions specs
export const placeRoom = (grid, { x = 0, y = 0, height = 1, width = 1 }, type) => {
  for (let i in grid) {
    if (
      grid[i].coordinates.x >= x &&
      grid[i].coordinates.x < x + width &&
      grid[i].coordinates.y >= y &&
      grid[i].coordinates.y < y + height
    ) {
      grid[i].type = type;
    }
  }
  return grid;
};

// isValidRoomPlacement
// This function returns a Boolean based on placement criteria
// True if room can be placed entirely on interior grid cells that are
// not adjacent to or overlapping other room cells, false otherwise
export const isValidRoomPlacement = (
  grid,
  { x = 0, y = 0, width = 1, height = 1 },
  gridHeight,
  gridWidth,
  type
) => {
  // check if on the edge of or outside of the grid
  // statements are top || bottom
  if (y < 1 || y + height >= gridHeight) {
    return false;
  }
  // statements are left || right
  if (x < 1 || x + width >= gridWidth) {
    return false;
  }

  // check if on or adjacent to existing room
  for (let i in grid) {
    if (
      grid[i].type === type && // primary criterion
      grid[i].coordinates.x >= x - 1 &&
      grid[i].coordinates.x <= x + width &&
      grid[i].coordinates.y >= y - 1 &&
      grid[i].coordinates.y <= y + height
    ) {
      return false;
    }
  }
  // all grid cells are clear
  return true;
};

// doorFinder
// This finds an appropriate, random value for door placement between rooms
// It takes either x coordinates + widths or y coordinates + heights
// start = parent (seed) top left corner x or y value
// extension = parent width or height
// childStart = child top left corner x or y value
// childExtension = child width or height
export const doorFinder = (parentStart, parentExtension, childStart, childExtension) => {
  const parent = _.range(parentStart, parentStart + parentExtension);
  const child = _.range(childStart, childStart + childExtension);
  const doorRange = child.filter(val => parent.includes(val));
  if (doorRange[0] === undefined) {
    throw new Error(
      'doorFinder Error: It is not possible to connect these two rooms with a single cell'
    );
  }
  return _.random(doorRange[0], doorRange[doorRange.length - 1]);
};

// north
// Make a room north of a seed
// First four arguments are values of the room being used as a seed
// Range is array of [min, max] number of cells per side of new room
export const north = (x, y, height, width, range) => {
  const [min, max] = range;
  const n = {
    height: _.random(min, max),
    width: _.random(min, max),
    door: { y: y - 1 },
  };
  n.x = _.random(x - n.width + 1, x + width - 1);
  n.y = y - n.height - 1;
  n.door.x = doorFinder(x, width, n.x, n.width);
  return n;
};

// east
// Make a room east of a seed
export const east = (x, y, height, width, range) => {
  const [min, max] = range;
  const e = {
    x: x + width + 1,
    height: _.random(min, max),
    width: _.random(min, max),
    door: {},
  };
  e.y = _.random(y - e.height + 1, height + y - 1);
  e.door.x = e.x - 1;
  e.door.y = doorFinder(y, height, e.y, e.height);
  return e;
};

// south
// Make a room south of a seed
export const south = (x, y, height, width, range) => {
  const [min, max] = range;
  const s = {
    y: y + height + 1,
    height: _.random(min, max),
    width: _.random(min, max),
    door: { y: y + height },
  };
  s.x = _.random(x - s.width + 1, width + x - 1);
  s.door.x = doorFinder(x, width, s.x, s.width);
  return s;
};

// Make a room west of a seed
export const west = (x, y, height, width, range) => {
  const [min, max] = range;
  const w = {
    height: _.random(min, max),
    width: _.random(min, max),
    door: { x: x - 1 },
  };
  w.x = x - w.width - 1;
  w.y = _.random(y - w.height + 1, height + y - 1);
  w.door.y = doorFinder(y, height, w.y, w.height);
  return w;
};

// repeatDirectionalRoomGeneration
// Generate room values for each edge of the seed room
// repeatDirectionalRoomGeneration adds `num` versions of a direction function to roomValues,
// permitting `num` paths from the seed room in that direction.
export const repeatDirectionalRoomGeneration = (num, func, seedSpecs, range) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(func(...seedSpecs, range)); // The ...args must be reintroduced each time or _.random values won't be recalculated
  }
  return arr;
};

// createRoomsFromSeed
// This function takes grid, a seed room, and a room size range and returns an object
// with `grid` and `placedRooms` arrays as properties
export const createRoomsFromSeed = (
  grid,
  { x, y, height, width },
  level,
  num = 5, // num is the number of possible branches from the seed in one direction
  range = c.ROOM_SIZE_RANGE
) => {
  // Push the directional objects to array roomValues
  const roomValues = [];
  const seed = [x, y, height, width];
  [north, east, south, west].map(func =>
    roomValues.push(...repeatDirectionalRoomGeneration(num, func, seed, c.ROOM_SIZE_RANGE))
  );

  // placedRooms contains data for `roomValues` items that made the cut
  const placedRooms = [];
  // For generated roomValues
  roomValues.forEach(room => {
    // if the room is valid relative to existing grid
    if (isValidRoomPlacement(grid, room, c.GRID_HEIGHT, c.GRID_WIDTH, tileTypes(level, 'path'))) {
      // update existing grid with room placement
      grid = placeRoom(grid, room, tileTypes(level, 'path'));
      // update existing grid with door placement
      grid = placeRoom(grid, { x: room.door.x, y: room.door.y }, tileTypes(level, 'path'));
      // record placedRoom values for the next seeds
      placedRooms.push(room);
    }
    // Note the lack of a working `else` statement. If the randomly generated room placement is invalid, tough luck!
    // This is the motivation behind repeatDirectionalRoomGeneration above.
  });
  // Return the updated grid and placedRooms in an object
  return { grid, placedRooms };
};

// growMap
// This function places rooms around a seed room.
// It takes grid, seed rooms, a counter, and a maxRooms constant.
// It takes a seedRoom array and places rooms based on that.
// Items in the `placedRooms` array recursively become seeds for future rooms.
export const growMap = (grid, seedRooms, level, counter = 0, maxRooms = c.MAX_ROOMS) => {
  // `growMap` runs recursively until maxRooms is reached or there are no more seedRooms.
  if (counter >= maxRooms || !seedRooms.length) {
    return grid; // Output is the grid array used by components
  }

  // create an object with `grid` and `placedRooms` keys
  const dataInProgress = createRoomsFromSeed(grid, seedRooms.pop(), level);
  // The placedRooms items pushed into the seedRooms argument array
  seedRooms.push(...dataInProgress.placedRooms);
  // Increment the counter
  counter++;

  return growMap(dataInProgress.grid, seedRooms, level, counter);
};

// addHorizontalDoors
// Doors connecting horizontally
export const addHorizontalDoors = (grid, level, probability) => {
  for (let i = 0; i < grid.length; i++) {
    if (
      // If cells on either side exist
      grid[i - 1] &&
      grid[i + 1] &&
      // If three cells are adjacent in a row
      grid[i - 1].coordinates.y === grid[i].coordinates.y &&
      grid[i + 1].coordinates.y === grid[i].coordinates.y &&
      // And the one in the middle isn't a floow but has floors on either side
      grid[i].type === tileTypes(level) &&
      grid[i - 1].type === tileTypes(level, 'path') &&
      grid[i + 1].type === tileTypes(level, 'path')
    ) {
      // There's a `probability` it will be converted into a floor
      if (probability >= Math.random()) {
        grid[i].type = tileTypes(level, 'path');
      }
    }
  }
  return grid;
};

// addVerticalDoors
// Doors connecting vertically
export const addVerticalDoors = (grid, level, probability, gridWidth = c.GRID_WIDTH) => {
  for (let i = 0; i < grid.length; i++) {
    if (
      // If cells above and below exist
      grid[i - gridWidth] &&
      grid[i + gridWidth] &&
      // If three cells are adjacent in a column
      grid[i - gridWidth].coordinates.x === grid[i].coordinates.x &&
      grid[i + gridWidth].coordinates.x === grid[i].coordinates.x &&
      // And the cell isn't a floor but has floors above and below
      grid[i].type === tileTypes(level) &&
      grid[i - gridWidth].type === tileTypes(level, 'path') &&
      grid[i + gridWidth].type === tileTypes(level, 'path')
    ) {
      // There's a `probability` it will be converted into a floor
      if (probability >= Math.random()) {
        grid[i].type = tileTypes(level, 'path');
      }
    }
  }
  return grid;
};

/*** FUNCTIONS FOR GENERATING THE GRID ***/
// generate makes an unpopulated map from an empty array
const generate = (grid, level) => {
  // 1. Make a grid
  grid = makeGrid(c.GRID_HEIGHT, c.GRID_WIDTH, tileTypes(level), grid);

  // 2. Set random values for the seed room
  const seedRoom = makeSeed(c.GRID_HEIGHT, c.GRID_WIDTH, c.ROOM_SIZE_RANGE);

  // 3. place the seed room onto the grid
  grid = placeRoom(grid, seedRoom, tileTypes(level, 'path'));

  // 4. place additional rooms based on that seed.
  grid = growMap(grid, [seedRoom], level);

  // 5. Probabilistically add more doors to reduce map linearity
  grid = addHorizontalDoors(grid, level, 0.1);
  grid = addVerticalDoors(grid, level, 0.1);

  return grid;
};

export default generate;
