import _ from 'lodash';
import * as c from '../../constants/settings';
import tileTypes from '../../constants/tile-types';

// Populate the data
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
        damage: _.random(1, 10),
        direction: direction(),
        health: _.random(20, 50)
      };

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
    for (let i in data) {
      // Loot
      const loot = { type: 'health' };

      // 1% chance of a cell being occupied by loot
      if (
        Object.keys(data[i].payload).length === 0 &&
        data[i].type === tileTypes(level, 'path') &&
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
