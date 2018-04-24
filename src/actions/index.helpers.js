import { GRID_WIDTH } from '../constants/settings';
import _ from 'lodash';

// Establish the player's potential next position given current position and direction
export const getTargetPosition = (playerPosition, direction) => {
  switch (direction) {
    case 'north':
      return {
        coordinates: { x: playerPosition.coordinates.x, y: playerPosition.coordinates.y - 1 },
        index: playerPosition.index - GRID_WIDTH
      };
    case 'east':
      return {
        coordinates: { x: playerPosition.coordinates.x + 1, y: playerPosition.coordinates.y },
        index: playerPosition.index + 1
      };
    case 'south':
      return {
        coordinates: { x: playerPosition.coordinates.x, y: playerPosition.coordinates.y + 1 },
        index: playerPosition.index + GRID_WIDTH
      };
    case 'west':
      return {
        coordinates: { x: playerPosition.coordinates.x - 1, y: playerPosition.coordinates.y },
        index: playerPosition.index - 1
      };
    default:
      return playerPosition;
  }
};

/***
     * Damage is calculated with: Damage * (1 + (0.25 * Level - 0.25))
      |-------+-------------------+------------|
      | Level | Damage Multiplier | if Dmg = 5 |
      |=======+===================+============|
      | 1     | 1                 | 5          |
      | 2     | 1.25              | 6.25       |
      | 3     | 1.5               | 7.5        |
      | 4     | 1.75              | 8.75       |
      | 5     | 2                 | 10         |
      |-------+-------------------+------------|
    ***/
export const damageCalc = (level, min, max) => {
  const damage = _.random(min, max);
  const multiplier = 1 + (0.25 * level - 0.25);
  return damage * multiplier;
};

/***
  |-------+------------|
  | LEVEL | EXPERIENCE |
  |=======+============|
  | 1     | 0          |
  | 2     | 30         |
  | 3     | 70         |
  | 4     | 120        |
  | 5     | 180        |
  | 6     | 250        |
  | 7     | 330        |
  | 8     | 420        |
  | 9     | 520        |
  | 10    | 630        |
  |-------+------------|
 ***/

export const levelCalc = (xp, level) => {
  switch (true) {
    case xp >= 30 && level === 1:
      return true;
    case xp >= 70 && level === 2:
      return true;
    case xp >= 120 && level === 3:
      return true;
    case xp >= 180 && level === 4:
      return true;
    case xp >= 250 && level === 5:
      return true;
    case xp >= 330 && level === 6:
      return true;
    case xp >= 420 && level === 7:
      return true;
    case xp >= 520 && level === 8:
      return true;
    case xp >= 630 && level === 9:
      return true;
    default:
      return false;
  }
};
