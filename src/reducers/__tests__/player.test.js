import player from '../player';
import * as t from '../../constants/action-types';
import * as g from '../../constants/gameplay';
import * as l from '../../constants/loot';

describe('`player` reducer', () => {
  it('should have default state with `experience`, `gold`, `health`, `level`, `weapon`, and `inventory` properties', () => {
    const action = { type: null };
    expect(player(undefined, action)).toHaveProperty('experience');
    expect(player(undefined, action)).toHaveProperty('gold');
    expect(player(undefined, action)).toHaveProperty('health');
    expect(player(undefined, action)).toHaveProperty('level');
    expect(player(undefined, action)).toHaveProperty('weapon');
    expect(player(undefined, action)).toHaveProperty('inventory');
  });

  it('should have default properties of the appropriate types', () => {
    const action = { type: null };
    expect(player(undefined, action)).toMatchObject({
      experience: expect.any(Number),
      gold: expect.any(Number),
      health: expect.objectContaining({
        current: expect.any(Number),
        max: expect.any(Number),
      }),
      level: expect.any(Number),
      weapon: expect.objectContaining({
        name: expect.any(String),
        min_damage: expect.any(Number),
        max_damage: expect.any(Number),
      }),
      inventory: expect.arrayContaining([l.weapons.fists]),
    });
  });

  it('should add gold to player `gold` property when `ADD_GOLD` action is received', () => {
    const action = { type: t.ADD_GOLD, amount: 10, targetObj: {} };
    const state = { gold: 0 };
    const updatedState = { gold: 10 };
    expect(player(state, action)).toEqual(updatedState);
  });

  it('should add an item to the inventory when `ADD_ITEM` action is received', () => {
    const action = { type: t.ADD_ITEM, item: l.weapons.spear };
    const inventory = [l.weapons.fists, l.weapons.dagger];
    const state = { inventory };
    const updatedInventory = [...inventory, l.weapons.spear];
    const updatedState = { inventory: updatedInventory };
    expect(player(state, action)).toEqual(updatedState);
  });

  it('should add an action.amount of experience to state.experience when an `ADD_XP` action is received', () => {
    const action = { type: t.ADD_XP, amount: 10 };
    const state0 = {
      experience: 0,
    };
    const state1 = {
      experience: 10,
    };
    const state2 = {
      experience: 20,
    };

    expect(player(state0, action)).toEqual(state1);
    expect(player(state1, action)).toEqual(state2);
  });

  it('should change the equipped weapon to the next in the inventory when `CHANGE_WEAPON` action is received', () => {
    const action = { type: t.CHANGE_WEAPON };
    const inventory = [l.weapons.fists, l.weapons.dagger];
    const weapon = l.weapons.fists;
    const state = { weapon, inventory };
    const updatedState = { weapon: l.weapons.dagger, inventory };
    expect(player(state, action)).toEqual(updatedState);
  });

  it('should change the equipped item to the first in the inventory if `CHANGE_WEAPON` action is received on the last inventory item', () => {
    const action = { type: t.CHANGE_WEAPON };
    const inventory = [l.weapons.fists, l.weapons.dagger];
    const weapon = l.weapons.dagger;
    const state = { weapon, inventory };
    const updatedState = { weapon: l.weapons.fists, inventory };
    expect(player(state, action)).toEqual(updatedState);
  });

  it('should heal the player for an action.amount of points when a `DRINK` action is received, up to max health', () => {
    const action = { type: t.DRINK, amount: 10 };
    // Health does not exceed max health
    const state0 = {
      health: {
        current: 1,
        max: 10,
      },
    };
    const state1 = {
      health: {
        current: 10,
        max: 10,
      },
    };
    // Standard health boost
    const state2 = {
      health: {
        current: 1,
        max: 20,
      },
    };
    const state3 = {
      health: {
        current: 11,
        max: 20,
      },
    };
    expect(player(state0, action)).toEqual(state1);
    expect(player(state2, action)).toEqual(state3);
  });

  it('should raise the player state.level by 1 and the player state.health.max by a calculated amount when a `LEVEL_UP` action is received', () => {
    const action = { type: t.LEVEL_UP };
    const state0 = {
      level: 1,
      health: {
        max: g.healthCalc(1),
      },
    };
    const state1 = {
      level: 2,
      health: {
        max: g.healthCalc(2),
      },
    };
    const state2 = {
      level: 3,
      health: {
        max: g.healthCalc(3),
      },
    };

    expect(player(state0, action)).toEqual(state1);
    expect(player(state1, action)).toEqual(state2);
  });

  it('should subtract action.damage health from state.health.current, with 0 as the floor when a `TAKE_DAMAGE` action is received', () => {
    const action = { type: t.TAKE_DAMAGE, damage: 15 };
    // Health doesn't go below 0
    const state0 = {
      health: {
        current: 10,
      },
    };
    const state1 = {
      health: {
        current: 0,
      },
    };
    // Standard health reduction
    const state2 = {
      health: {
        current: 20,
      },
    };
    const state3 = {
      health: {
        current: 5,
      },
    };
    expect(player(state0, action)).toEqual(state1);
    expect(player(state2, action)).toEqual(state3);
  });
});
