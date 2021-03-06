/*** These functions determine gameplay balance
 * Damage,
 * Experience,
 * Health, and
 * Level calculations.
 ***/

import _ from 'lodash';

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
export const damageCalc = (min, max, level) => {
  const damage = _.random(min, max);
  const multiplier = 1 + (0.25 * level - 0.25);
  return damage * multiplier;
};

// Experience per enemy killed
export const xpCalc = enemyLevel => {
  return enemyLevel * 10;
};

// Calculate how much a drink of enchanted spring water heals
// Amount based on grid level
export const healingCalc = gridLevel => {
  return gridLevel * 10;
};

// Calculate new max health on level up
// Leveling up affects damage calculations in actions and increases max health by ~10%
export const healthCalc = level => {
  return level * 10;
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

export const levelCheck = (xp, level) => {
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
