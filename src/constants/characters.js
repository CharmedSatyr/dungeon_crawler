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

export const addWeapon = chances => {
  switch (true) {
    case chances < 0.5:
      return l.weapons.fists;
    case chances < 0.75:
      return l.weapons.dagger;
    case chances <= 1.0:
      return l.weapons.spear;
    default:
      return l.weapons.fists;
  }
};

export const orc = class Orc {
  constructor() {
    this.weapon = addWeapon(Math.random());
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
