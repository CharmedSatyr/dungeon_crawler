import _ from 'lodash';
import * as c from '../../constants/settings';
import tileTypes from '../../constants/tile-types';

// Populate the data with payloads (player, enemies, etc.)
export const populate = (data, level) => {
  // Add enemies
  const addEnemies = data => {
    for (let i in data) {
      // Enemy
      const direction = () => {
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
      const enemy = {
        damage: {
          min: 1,
          max: 3
        },
        facing: direction(),
        level: _.random(1, 5)
      };
      enemy.health = enemy.level * 10;

      // 2.5% chance of a cell being occupied by an enemy
      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === tileTypes(level, 'path') &&
        Math.random() > 0.975
      ) {
        data[i].payload = { enemy };
      }
    }
    return data;
  };
  data = addEnemies(data);

  // Add loot
  const addLoot = data => {
    for (let i = 0; i < data.length; i++) {
      // Loot
      const setLoot = chances => {
        switch (true) {
          case chances <= 0.1:
            return 'spear';
          case chances <= 0.2:
            return '2';
          case chances <= 0.3:
            return '3';
          case chances <= 0.4:
            return '4';
          case chances <= 0.5:
            return '5';
          case chances <= 0.6:
            return '6';
          case chances <= 0.7:
            return '7';
          case chances <= 0.8:
            return '8';
          case chances <= 0.9:
            return '9';
          case chances <= 1.0:
            return '10';
          default:
            return 'spear';
        }
      };

      // Don't block a door with loot
      const clearTheDoor = (data, i) => {
        const barrier = tileTypes(level);
        const path = tileTypes(level, 'path');

        // No door to the right
        const right = data[i + 1];
        const upRight = data[i + 1 - c.GRID_WIDTH];
        const downRight = data[i + 1 + c.GRID_WIDTH];

        if (
          upRight &&
          right &&
          downRight &&
          upRight.type === barrier &&
          right.type === path &&
          downRight.type === barrier
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
          upLeft.type === barrier &&
          up.type === path &&
          upRight.type === barrier
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
          upLeft.type === barrier &&
          left.type === path &&
          downLeft.type === barrier
        ) {
          return false;
        }

        // No door below
        const down = data[i + c.GRID_WIDTH];
        if (
          downLeft &&
          down &&
          downRight &&
          downLeft.type === barrier &&
          down.type === path &&
          downRight.type === barrier
        ) {
          return false;
        }

        // Not in a doorway
        if (
          up &&
          down &&
          left &&
          right &&
          up.type !== path &&
          down.type !== path &&
          left.type === path &&
          right.type === path
        ) {
          return false;
        }

        if (
          up &&
          down &&
          left &&
          right &&
          up.type === path &&
          down.type === path &&
          left.type === barrier &&
          right.type === barrier
        ) {
          return false;
        }
        return true;
      };

      const loot = { type: setLoot(Math.random()) };
      // 1% chance of a cell being occupied by loot
      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === tileTypes(level, 'path') &&
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

      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === tileTypes(level, 'path') &&
        count <= 2
      ) {
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
        health: 20
      };
      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === tileTypes(level, 'path') &&
        count <= 2
      ) {
        count++;
        if (count === 2) {
          data[i].payload = { player };

          // Save playerPosition as a variable
          playerPosition = {
            coordinates: { x: data[i].coordinates.x, y: data[i].coordinates.y },
            index: i
          };
        }
      }
    }
    return data;
  };
  data = addPlayer(data);

  return { data, playerPosition };
};
