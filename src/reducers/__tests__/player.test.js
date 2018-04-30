import player from '../player';
import * as t from '../../constants/action-types';
import * as g from '../../constants/gameplay';

describe('`player` reducer', () => {
  it('should add an action.amount of experience to state.experience when an `ADD_XP` action is received', () => {
    const action = { type: t.ADD_XP, amount: 10 };
    const state0 = {
      experience: 0
    };
    const state1 = {
      experience: 10
    };
    const state2 = {
      experience: 20
    };

    expect(player(state0, action)).toEqual(state1);
    expect(player(state1, action)).toEqual(state2);
  });

  it('should raise the player state.level by 1 and the player state.health.max by a calculated amount when a `LEVEL_UP` action is received', () => {
    const action = { type: t.LEVEL_UP };
    const state0 = {
      level: 1,
      health: {
        max: g.healthCalc(1)
      }
    };
    const state1 = {
      level: 2,
      health: {
        max: g.healthCalc(2)
      }
    };
    const state2 = {
      level: 3,
      health: {
        max: g.healthCalc(3)
      }
    };

    expect(player(state0, action)).toEqual(state1);
    expect(player(state1, action)).toEqual(state2);
  });

  it('should heal the player for an action.amount of points when a `DRINK` action is received, up to max health', () => {
    const action = { type: t.DRINK, amount: 10 };
    // Health does not exceed max health
    const state0 = {
      health: {
        current: 1,
        max: 10
      }
    };
    const state1 = {
      health: {
        current: 10,
        max: 10
      }
    };
    // Standard health boost
    const state2 = {
      health: {
        current: 1,
        max: 20
      }
    };
    const state3 = {
      health: {
        current: 11,
        max: 20
      }
    };
    expect(player(state0, action)).toEqual(state1);
    expect(player(state2, action)).toEqual(state3);
  });

  it('should subtract action.damage health from state.health.current, with 0 as the floor when a `TAKE_DAMAGE` action is received', () => {
    const action = { type: t.TAKE_DAMAGE, damage: 15 };
    // Health doesn't go below 0
    const state0 = {
      health: {
        current: 10
      }
    };
    const state1 = {
      health: {
        current: 0
      }
    };
    // Standard health reduction
    const state2 = {
      health: {
        current: 20
      }
    };
    const state3 = {
      health: {
        current: 5
      }
    };
    expect(player(state0, action)).toEqual(state1);
    expect(player(state2, action)).toEqual(state3);
  });
});
