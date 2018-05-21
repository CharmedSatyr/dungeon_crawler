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

export const addBoss = (data, pathType, level) => {
  let count = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    const boss = {
      weapon: l.weapons.trident,
      facing: direction(),
      level: _.random(7, 10),
    };
    boss.health = g.healthCalc(boss.level);

    // boss only appears on `level` 3
    if (
      level === 3 &&
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType &&
      count <= 2
    ) {
      count++;
      if (count === 2) {
        data[i].payload = { boss };
      }
    }
  }
  return data;
};

/*** Loot functions ***/
// Don't block a door with loot
export const clearTheDoor = (data, i, gridWidth, pathType) => {
  // No door to the right
  const right = data[i + 1];
  const upRight = data[i + 1 - gridWidth];
  const downRight = data[i + 1 + gridWidth];

  if (
    upRight &&
    right &&
    downRight &&
    upRight.type !== pathType &&
    right.type === pathType &&
    downRight.type !== pathType
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
    upLeft.type !== pathType &&
    up.type === pathType &&
    upRight.type !== pathType
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
    upLeft.type !== pathType &&
    left.type === pathType &&
    downLeft.type !== pathType
  ) {
    return false;
  }

  // No door below
  const down = data[i + gridWidth];
  if (
    downLeft &&
    down &&
    downRight &&
    downLeft.type !== pathType &&
    down.type === pathType &&
    downRight.type !== pathType
  ) {
    return false;
  }

  // Not in a doorway
  if (
    up &&
    down &&
    left &&
    right &&
    up.type !== pathType &&
    down.type !== pathType &&
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
    left.type !== pathType &&
    right.type !== pathType
  ) {
    return false;
  }
  return true;
};

// Set the type of loot in a square
export const setLootType = chances => {
  switch (true) {
    case chances < 0.9:
      return l.fullBarrel;
    case chances >= 0.9:
      return { item: l.weapons.spear };
    default:
      return l.fullBarrel;
  }
};

// Add loot
export const addLoot = (data, gridWidth, pathType, probability) => {
  for (let i = 0; i < data.length; i++) {
    const loot = setLootType(Math.random());
    if (
      Object.keys(data[i].payload).length === 0 &&
      data[i].type === pathType &&
      clearTheDoor(data, i, gridWidth, pathType) &&
      probability >= Math.random()
    ) {
      data[i].payload = { loot };
    }
  }
  return data;
};

/*** ADD PORTAL ***/
export const addPortal = (data, pathType, level) => {
  let count = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    // portal
    const portal = { open: false };

    if (Object.keys(data[i].payload).length === 0 && data[i].type === pathType && count <= 2) {
      count++;
      if (count === 2 && level < 3) {
        data[i].payload = { portal };
      }
    }
  }
  return data;
};

/*** ADD PLAYER ***/
// addPlayer
export const addPlayer = (data, pathType) => {
  let count = 0;
  let playerPosition;
  for (let i = 0; i <= data.length - 1; i++) {
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
  return { data, playerPosition };
};

// Populate the data with payloads (player, enemies, etc.)
const populate = (data, level, gridWidth = c.GRID_WIDTH, pathType = tileTypes(level, 'path')) => {
  // Add enemies
  data = addEnemies(data, pathType, 0.025);

  // Add the boss just west of the southeast corner for level 3
  data = addBoss(data, pathType, level);

  // Add loot
  data = addLoot(data, gridWidth, pathType, 0.02);

  // Add portal just west of the southeast corner for levels 1-2
  data = addPortal(data, pathType, level);

  // Position player just east of the northwest corner
  const p = addPlayer(data, pathType);

  return { data: p.data, playerPosition: p.playerPosition };
};

export default populate;
