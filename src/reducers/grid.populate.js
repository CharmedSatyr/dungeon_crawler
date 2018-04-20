import _ from 'lodash';
import * as c from '../constants/settings';

// Populate the data
export const populate = data => {
  // Add enemies
  const addEnemies = data => {
    for (let i in data) {
      // 2.5% chance of a cell being occupied by an enemy
      if (
        !data[i].enemy &&
        !data[i].loot &&
        !data[i].player &&
        !data[i].portal &&
        data[i].type === 1 &&
        Math.random() > 0.975
      ) {
        data[i].enemy = {
          damage: _.random(1, 10),
          health: _.random(20, 50)
        };
      }
    }
    return data;
  };
  data = addEnemies(data);

  // Add loot
  const addLoot = data => {
    for (let i in data) {
      // 1% chance of a cell being occupied by loot
      if (
        !data[i].enemy &&
        !data[i].loot &&
        !data[i].player &&
        !data[i].portal &&
        data[i].type === 1 &&
        Math.random() > 0.99
      ) {
        data[i].loot = {
          type: 'health'
        };
      }
    }
    return data;
  };
  data = addLoot(data);

  // Add portal just west of the southeast corner
  const addPortal = (data, count = 0) => {
    for (let i = c.TOTAL_CELLS - 1; i >= 0; i--) {
      if (
        !data[i].enemy &&
        !data[i].loot &&
        !data[i].player &&
        !data[i].portal &&
        data[i].type === 1 &&
        count <= 2
      ) {
        count++;
        if (count === 2) {
          data[i].portal = true;
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
      if (
        !data[i].enemy &&
        !data[i].loot &&
        !data[i].player &&
        !data[i].portal &&
        data[i].type === 1 &&
        count <= 2
      ) {
        count++;
        if (count === 2) {
          data[i].player = { facing: 's', level: 1, health: 20 };

          // Save playerCell as a variable
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
