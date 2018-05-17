import _ from 'lodash';
import * as c from '../../constants/settings';
import * as l from '../../constants/loot';
import * as g from '../../constants/gameplay';
import tileTypes from '../../constants/tile-types';

/*** Enemy functions ***/
// direction
// Returns a random cardinal direction
export const direction = () => {
  const n = Math.random();
  switch (true) {
    case n < 0.25:
      return 'north';
    case n < 0.5:
      return 'east';
    case n < 0.75:
      return 'south';
    case n <= 1.0:
      return 'west';
    default:
      return 'south';
  }
};

// Add enemies
export const addEnemies = (data, pathType, probability) => {
  for (let i in data) {
    const enemy = {
      weapon: l.weapons.spear,
      facing: direction(),
      level: _.random(1, 5),
    };
    enemy.health = g.healthCalc(enemy.level);

    // `probability` of an empty path being occupied by an enemy
    if (
      probability >= Math.random() &&
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType
    ) {
      data[i].payload = { enemy };
    }
  }
  return data;
};

/*** Loot functions ***/
// Don't block a door with loot
export const clearTheDoor = (data, i, gridWidth, defaultType, pathType) => {
  // No door to the right
  const right = data[i + 1];
  const upRight = data[i + 1 - gridWidth];
  const downRight = data[i + 1 + gridWidth];

  if (
    upRight &&
    right &&
    downRight &&
    upRight.type === defaultType &&
    right.type === pathType &&
    downRight.type === defaultType
  ) {
    return false;
  }

  // No door above
  const up = data[i - gridWidth];
  const upLeft = data[i - 1 - gridWidth];
  if (
    upLeft &&
    up &&
    upRight &&
    upLeft.type === defaultType &&
    up.type === pathType &&
    upRight.type === defaultType
  ) {
    return false;
  }

  // No door left
  const left = data[i - 1];
  const downLeft = data[i - 1 + gridWidth];
  if (
    upLeft &&
    left &&
    downLeft &&
    upLeft.type === defaultType &&
    left.type === pathType &&
    downLeft.type === defaultType
  ) {
    return false;
  }

  // No door below
  const down = data[i + gridWidth];
  if (
    downLeft &&
    down &&
    downRight &&
    downLeft.type === defaultType &&
    down.type === pathType &&
    downRight.type === defaultType
  ) {
    return false;
  }

  // Not in a doorway
  if (
    up &&
    down &&
    left &&
    right &&
    up.type === defaultType &&
    down.type === defaultType &&
    left.type === pathType &&
    right.type === pathType
  ) {
    return false;
  }

  if (
    up &&
    down &&
    left &&
    right &&
    up.type === pathType &&
    down.type === pathType &&
    left.type === defaultType &&
    right.type === defaultType
  ) {
    return false;
  }
  return true;
};

// Set the type of loot in a square
export const setLoot = chances => {
  switch (true) {
    default:
      return { barrel: { full: true } };
  }
};

// Add loot
export const addLoot = (data, gridWidth, pathType, probability) => {
  for (let i = 0; i < data.length; i++) {
    const loot = setLoot(Math.random());
    if (
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType &&
      clearTheDoor(data, i) &&
      probability >= Math.random()
    ) {
      data[i].payload = { loot };
    }
  }
  return data;
};

// Populate the data with payloads (player, enemies, etc.)
const populate = (
  data,
  level,
  defaultType = tileTypes(level),
  pathType = tileTypes(level, 'path')
) => {
  // Add enemies
  data = addEnemies(data, pathType, 0.975);

  data = addLoot(data, c.GRID_WIDTH, 0.01);

  // Add portal just west of the southeast corner
  const addPortal = (data, count = 0) => {
    for (let i = c.TOTAL_CELLS - 1; i >= 0; i--) {
      // portal
      const portal = { open: false };

      if (Object.keys(data[i].payload).length === 0 && data[i].type === pathType && count <= 2) {
        count++;
        if (count === 2) {
          data[i].payload = { portal };
        }
      }
    }
    return data;
  };
  data = addPortal(data);

  // Position player just east of the northwest corner
  let playerPosition;
  const addPlayer = (data, count = 0) => {
    for (let i = 0; i <= c.TOTAL_CELLS - 1; i++) {
      // Player
      const player = {
        facing: 'south',
        level: 1,
        health: 20,
      };
      if (Object.keys(data[i].payload).length === 0 && data[i].type === pathType && count <= 2) {
        count++;
        if (count === 2) {
          data[i].payload = { player };

          // Save playerPosition as a variable
          playerPosition = {
            coordinates: { x: data[i].coordinates.x, y: data[i].coordinates.y },
            index: i,
          };
        }
      }
    }
    return data;
  };
  data = addPlayer(data);

  return { data, playerPosition };
};

export default populate;
