import _ from 'lodash';
import * as c from '../constants/settings';

// Populate the grid
export const populate = grid => {
  // Add enemies
  const addEnemies = grid => {
    for (let i in grid) {
      // 2.5% chance of a cell being occupied by an enemy
      if (
        !grid[i].enemy &&
        !grid[i].loot &&
        !grid[i].player &&
        !grid[i].portal &&
        grid[i].type === 1 &&
        Math.random() > 0.975
      ) {
        grid[i].enemy = {
          damage: _.random(1, 10),
          health: _.random(20, 50)
        };
      }
    }
    return grid;
  };
  grid = addEnemies(grid);

  // Add loot
  const addLoot = grid => {
    for (let i in grid) {
      // 1% chance of a cell being occupied by loot
      if (
        !grid[i].enemy &&
        !grid[i].loot &&
        !grid[i].player &&
        !grid[i].portal &&
        grid[i].type === 1 &&
        Math.random() > 0.99
      ) {
        grid[i].loot = {
          type: 'health'
        };
      }
    }
    return grid;
  };
  grid = addLoot(grid);

  // Add portal just west of the southeast corner
  const addPortal = (grid, count = 0) => {
    for (let i = c.TOTAL_CELLS - 1; i >= 0; i--) {
      if (
        !grid[i].enemy &&
        !grid[i].loot &&
        !grid[i].player &&
        !grid[i].portal &&
        grid[i].type === 1 &&
        count <= 2
      ) {
        count++;
        if (count === 2) {
          grid[i].portal = true;
        }
      }
    }
    return grid;
  };
  grid = addPortal(grid);

  // Position player just east of the northwest corner
  const addPlayer = (grid, count = 0) => {
    for (let i = 0; i <= c.TOTAL_CELLS - 1; i++) {
      if (
        !grid[i].enemy &&
        !grid[i].loot &&
        !grid[i].player &&
        !grid[i].portal &&
        grid[i].type === 1 &&
        count <= 2
      ) {
        count++;
        if (count === 2) {
          grid[i].player = { direction: 's' };
        }
      }
    }
    return grid;
  };
  grid = addPlayer(grid);

  return grid;
};
