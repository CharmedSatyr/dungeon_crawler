import _ from 'lodash';
import * as c from '../../constants/settings';
import tileTypes from '../../constants/tile-types';

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
        type
      });
      index++;
    }
  }
  return grid;
};

// Set random values for the first room
export const makeSeed = (gridHeight, gridWidth, range) => {
  const [min, max] = range;
  if (max + 2 > gridHeight || max + 2 > gridWidth) {
    throw new Error('Error: Invalid range. Seed room must fit entirely on non-edge grid cells.');
  }
  return {
    x: _.random(1, gridWidth - max - 1), // x top left corner placement
    y: _.random(1, gridHeight - max - 1), // y top left corner placement
    height: _.random(min, max), // height of first room
    width: _.random(min, max) // width of first room
  };
};

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

/*** FUNCTIONS FOR GENERATING THE GRID ***/
// generate makes an unpopulated map from an empty array
const generate = (grid, level) => {
  // 1. Make a grid
  grid = makeGrid(c.GRID_HEIGHT, c.GRID_WIDTH, tileTypes(level), grid);

  // 2. Set random values for the first, seed room
  const seedRoom = makeSeed(c.GRID_HEIGHT, c.GRID_WIDTH, c.ROOM_SIZE_RANGE);

  // 3. place the first room onto the grid
  grid = placeRoom(grid, seedRoom, tileTypes(level, 'path'));

  // 4. place additional rooms based on that seed.
  // This function takes grid, a seed room, and a room size range and returns and object
  // that contains modified grid and a record of placed rooms
  const createRoomsFromSeed = (grid, { x, y, height, width }, range = c.ROOM_SIZE_RANGE) => {
    const [min, max] = range;

    // This finds an appropriate, random value for door placement between rooms
    // It works with either x coordinates + widths or y coordinates + heights
    // start = parent (seed) top left corner x or y value
    // extension = parent width or height
    // childStart = child top left corner x or y value
    // childExtension = child width or height
    const doorFinder = (start, extension, childStart, childExtension) => {
      const parent = _.range(start, start + extension);
      const child = _.range(childStart, childStart + childExtension);
      const doorRange = child.filter(val => parent.includes(val));
      return _.random(doorRange[0], doorRange[doorRange.length - 1]);
    };

    // Make a room north of the seed
    // All argument values are values of the room being used as a seed
    const north = (x, y, height, width) => {
      const n = {
        height: _.random(min, max),
        width: _.random(min, max),
        door: { y: y - 1 }
      };
      n.x = _.random(x - n.width + 1, x + width - 1);
      n.y = y - n.height - 1;
      n.door.x = doorFinder(x, width, n.x, n.width);
      return n;
    };

    // Make a room east of the seed
    const east = (x, y, height, width) => {
      const e = {
        x: x + width + 1,
        height: _.random(min, max),
        width: _.random(min, max),
        door: {}
      };
      e.y = _.random(y - e.height + 1, height + y - 1);
      e.door.x = e.x - 1;
      e.door.y = doorFinder(y, height, e.y, e.height);
      return e;
    };

    // Make a room south of the seed
    const south = (x, y, height, width) => {
      const s = {
        y: y + height + 1,
        height: _.random(min, max),
        width: _.random(min, max),
        door: { y: y + height }
      };
      s.x = _.random(x - s.width + 1, width + x - 1);
      s.door.x = doorFinder(x, width, s.x, s.width);
      return s;
    };

    // Make a room west of the seed
    const west = (x, y, height, width) => {
      const w = {
        height: _.random(min, max),
        width: _.random(min, max),
        door: { x: x - 1 }
      };
      w.x = x - w.width - 1;
      w.y = _.random(y - w.height + 1, height + y - 1);
      w.door.y = doorFinder(y, height, w.y, w.height);
      return w;
    };

    // Generate room values for each edge of the seed room
    // repeatFunc adds `num` versions of a direction function to roomValues,
    // permitting `num` paths from the seed room in that direction.
    const repeatFunc = (num, func, args) => {
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push(func(...args)); // The ...args must be reintroduced each time or _.random values won't be recalculated
      }
      return arr;
    };

    // Push the directional objects to array roomValues
    const roomValues = [];
    const num = 5; // Number of possible branches from the seed in one direction
    const seed = [x, y, height, width];
    [north, east, south, west].map(func => roomValues.push(...repeatFunc(num, func, seed)));

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
      // This is the motivation behind repeatFunc above.
    });
    // Return the updated grid and placedRooms in an object
    return { grid, placedRooms };
  };

  // This function places rooms around a seed room.
  // It takes grid, seed rooms, a counter, and a maxRooms constant.
  // It takes a seedRoom array and places rooms based on that.
  // Then, items in the `placedRooms` array become seeds for future rooms.
  const growMap = (grid, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
    // It runs the createRoomsFromSeed function recursively until maxRooms is reached or there are no more seedRooms.
    if (counter >= maxRooms || !seedRooms.length) {
      return grid; // Final output is the straight grid array that is read by the reducer.
    }

    grid = createRoomsFromSeed(grid, seedRooms.pop());
    seedRooms.push(...grid.placedRooms);
    counter++;

    return growMap(grid.grid, seedRooms, counter);
  };
  // `seedRoom` from step 2 is the mother seedRoom.
  grid = growMap(grid, [seedRoom]);

  // 5. Add more doors
  // Now that the rooms are placed, we will loop through and add a few more doors to reduce map linearity
  // Doors connecting horizontally
  const addHorizontalDoors = grid => {
    for (let i = 1; i < grid.length - 1; i++) {
      if (
        // If three cells are adjacent in a row
        grid[i - 1].coordinates.y === grid[i].coordinates.y &&
        grid[i + 1].coordinates.y === grid[i].coordinates.y &&
        // And the one in the middle has floors on either side but isn't a floor
        grid[i - 1].type === tileTypes(level, 'path') &&
        grid[i + 1].type === tileTypes(level, 'path') &&
        grid[i].type === tileTypes(level)
      ) {
        // There's a 10% chance it will be converted into a floor
        if (Math.random() > 0.9) {
          grid[i].type = tileTypes(level, 'path');
        }
      }
    }
    return grid;
  };
  grid = addHorizontalDoors(grid);

  // Doors connecting vertically
  const addVerticalDoors = grid => {
    for (let i = c.GRID_WIDTH; i < c.GRID_HEIGHT - 1; i++) {
      if (
        // If three cells are adjacent in a column
        grid[i - c.GRID_WIDTH].coordinates.x === grid[i].coordinates.x &&
        grid[i + c.GRID_WIDTH].coordinates.x === grid[i].coordinates.x &&
        // And the one in the middle has floors above and below but isn't a floor
        grid[i - c.GRID_WIDTH].type === tileTypes(level, 'path') &&
        grid[i + c.GRID_WIDTH].type === tileTypes(level, 'path') &&
        grid[i].type === tileTypes(level)
      ) {
        // There's a 10% chance it will be converted into a floor
        if (Math.random() > 0.9) {
          grid[i].type = tileTypes(level, 'path');
        }
      }
    }
    return grid;
  };
  grid = addVerticalDoors(grid);

  return grid;
};

export default generate;
