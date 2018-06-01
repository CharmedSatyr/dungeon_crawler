import _ from 'lodash';
import * as l from './loot';
import * as g from './gameplay';

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

export const orc = class Orc {
  constructor() {
    this.weapon = l.weapons.spear;
    this.facing = direction();
    this.level = _.random(1, 5);
    this.type = 'orc';
    this.health = g.healthCalc(this.level);
  }
};

export const boss = {
  weapon: l.weapons.trident,
  facing: 'west',
  level: _.random(7, 10),
  type: 'boss',
};
boss.health = g.healthCalc(boss.level);

export const prince = {
  weapon: l.weapons.trident,
  facing: 'west',
  level: _.random(2, 4),
  type: 'prince',
};
prince.health = g.healthCalc(prince.level);

export const player = {
  facing: 'south',
  level: 1,
  health: 20,
};
