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

// Populate the data with payloads (player, enemies, etc.)
const populate = (
  data,
  level,
  defaultType = tileTypes(level),
  pathType = tileTypes(level, 'path')
) => {
  // Add enemies
  data = addEnemies(data, pathType, 0.975);

  // Add loot
  const addLoot = data => {
    for (let i = 0; i < data.length; i++) {
      // Loot
      const setLoot = chances => {
        switch (true) {
          default:
            return { barrel: { full: true } };
        }
      };

      // Don't block a door with loot
      const clearTheDoor = (data, i) => {
        // No door to the right
        const right = data[i + 1];
        const upRight = data[i + 1 - c.GRID_WIDTH];
        const downRight = data[i + 1 + c.GRID_WIDTH];

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
        const up = data[i - c.GRID_WIDTH];
        const upLeft = data[i - 1 - c.GRID_WIDTH];
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
        const downLeft = data[i - 1 + c.GRID_WIDTH];
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
        const down = data[i + c.GRID_WIDTH];
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
          left.type === defaultType &&
          right.type === defaultType
        ) {
          return false;
        }
        return true;
      };

      const loot = setLoot(Math.random());
      // 1% chance of a cell being occupied by loot
      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === pathType &&
        clearTheDoor(data, i) &&
        Math.random() > 0.99
      ) {
        data[i].payload = { loot };
      }
    }
    return data;
  };
  data = addLoot(data);

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
