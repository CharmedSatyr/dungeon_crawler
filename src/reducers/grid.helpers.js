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
      type: 0
    });
  }
}

// 2. Random values for the first room
const [min, max] = c.ROOM_SIZE_RANGE;
console.log('min, max:', '[' + min + ', ' + max + ']');

const firstRoom = {
  x: _.random(1, c.GRID_WIDTH - max - 1), // x top left corner placement
  y: _.random(1, c.GRID_HEIGHT - max), // y top left corner placement
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
gridData = placeCells(gridData, firstRoom); // Step 3

// 4. place additional rooms based on that seed.
// This function returns a Boolean based on placement criteria
const isValidRoomPlacement = (gridData, { x, y, width = 1, height = 1 }) => {
  // check if on the edge of or outside of the grid
  // statements are top || bottom
  if (y < 1 || y + height >= c.GRID_HEIGHT) {
    console.log('y PLACEMENT REJECTED!');
    return false;
  }
  // statements are left || right
  if (x < 1 || x + width >= c.GRID_WIDTH) {
    console.log('x PLACEMENT REJECTED!');
    return false;
  }

  // check if on or adjacent to existing room
  for (let i in gridData) {
    if (
      gridData[i].type === 'floor' && // primary criterion
      gridData[i].coordinates.x >= x - 1 &&
      gridData[i].coordinates.x <= x + width &&
      gridData[i].coordinates.y >= y - 1 &&
      gridData[i].coordinates.y <= y + height
    ) {
      console.log('adjacent or existing ROOM PLACEMENT REJECTED!');
      return false;
    }
  }

  // all grid cells are clear
  return true;
};

// This function takes gridData, a seed room, and a room size range and returns and object
// that contains modified gridData and a record of placed rooms
const createRoomsFromSeed = (gridData, { x, y, height, width }, range = c.ROOM_SIZE_RANGE) => {
  const [min, max] = range;

  // Generated room values for each edge of the seed room
  const roomValues = [];

  // Make a room north of the seed
  // All argument values are values of the room being used as a seed
  const north = (x, y, height, width) => {
    return {
      x: _.random(x, x + width - 1), // Can be refined to, e.g., x - width + 1, once you figure out how to fix the door
      get y() {
        return y - this.height - 1; // Needs to be in a getter else `this.height` might not be assigned yet
      },
      height: _.random(min, max),
      width: _.random(min, max),
      get door() {
        // The `this` of `door.x` is the `this` of `door`, not of `door.x`, meaning the returned object can access parent object properties
        return {
          x: this.x, // A boring but stable value
          y: y - 1
        };
      }
    };
  };

  // Make a room east of the seed
  const east = (x, y, height, width) => {
    return {
      x: x + width + 1,
      y: _.random(y, height + y - 1),
      height: _.random(min, max),
      width: _.random(min, max),
      get door() {
        return {
          x: this.x - 1,
          y: this.y // Another boring but stable value
        };
      }
    };
  };

  // Make a room south of the seed
  const south = (x, y, height, width) => {
    return {
      x: _.random(x, width + x - 1),
      y: y + height + 1,
      height: _.random(min, max),
      width: _.random(min, max),
      get door() {
        return {
          x: this.x,
          y: y + height
        };
      }
    };
  };

  // Make a room west of the seed
  const west = (x, y, height, width) => {
    return {
      get x() {
        return x - this.width - 1;
      },
      y: y,
      height: _.random(min, max),
      width: _.random(min, max),
      get door() {
        return {
          x: x - 1,
          y: this.y
        };
      }
    };
  };

  // Push the directional objects to array roomValues
  const n = north(x, y, height, width);
  const e = east(x, y, height, width);
  const s = south(x, y, height, width);
  const w = west(x, y, height, width);
  roomValues.push(n, e, s, w);

  const placedRooms = [];
  // For all generated roomValues
  roomValues.forEach(room => {
    // if the room is valid relative to existing gridData
    if (isValidRoomPlacement(gridData, room)) {
      // update existing gridData with room placement
      gridData = placeCells(gridData, room);
      // update existing gridData with door placement
      gridData = placeCells(gridData, { x: room.door.x, y: room.door.y }, 'floor');
      // record placedRoom values for the next seeds
      placedRooms.push(room);
    } else {
      // Note the lack of a working `else` statement. If the randomly generated room placement is invalid, tough luck!
      // The map has one fewer room.
      // roomValues.push(north(x, y, height, width));
    }
  });
  // Return the updated gridData and placedRooms in an object
  // console.log('createRoomsFromSeed output: ', { gridData, placedRooms });
  return { gridData, placedRooms };
};

// This function places rooms from the seed room created in step 3.
// It takes gridData, an array of seedRooms that begins as firstRoom and becomes the array of placedRooms,
// a counter integer, and a maxRooms constant.
// // It runs the createRoomsFromSeed function recursively until
const growMap = (gridData, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
  // Stop working if... or if there are no more rooms in the seedRooms array
  // console.log('maxRooms: ', maxRooms);
  // console.log('counter, seedRooms.length', counter + ', ' + seedRooms.length);
  if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
    return gridData;
  }

  // console.log('gridData before: ', gridData);
  // console.log('seedRooms.length before: ', seedRooms.length);
  gridData = createRoomsFromSeed(gridData, seedRooms.pop());
  // console.log('gridData after: ', gridData);
  // console.log('seedRooms.length after: ', seedRooms.length);

  seedRooms.push(...gridData.placedRooms);
  counter += gridData.placedRooms.length;
  return growMap(gridData.gridData, seedRooms, counter);
};
gridData = growMap(gridData, [firstRoom]);
