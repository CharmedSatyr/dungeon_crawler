import player from '../player';
import * as t from '../../constants/action-types';
import * as g from '../../constants/gameplay';

describe('`player` reducer', () => {
  it('should add an action.amount of experience to state.experience when an `ADD_XP` action is received', () => {
    const action = { type: t.ADD_XP, amount: 10 };
    const state = {
      experience: 0
    };
    const newState = {
      experience: 10
    };
    expect(player(state, action)).toEqual(newState);
  });

  it('should raise the player state.level by 1 and the player state.health.max by a calculated amount when a `LEVEL_UP` action is received', () => {
    const action = { type: t.LEVEL_UP };
    const state = {
      level: 1,
      health: {
        max: g.healthCalc(1)
      }
    };
    const newState = {
      level: 2,
      health: {
        max: g.healthCalc(2)
      }
    };
    expect(player(state, action)).toEqual(newState);
  });

  it('should heal the player for an action.amount of points when a `DRINK` action is received, up to max health', () => {
    const action = { type: t.DRINK, amount: 10 };
    const state = {
      health: {
        current: 1,
        max: 10
      }
    };
    const newState = {
      health: {
        current: 10,
        max: 10
      }
    };
    expect(player(state, action)).toEqual(newState);
  });

  it('should subtract action.damage health from state.health.current, with 0 as the floor when a `TAKE_DAMAGE` action is received', () => {
    const action = { type: t.TAKE_DAMAGE, damage: 100 };
    const state = {
      health: {
        current: 10
      }
    };
    const newState = {
      health: {
        current: 0
      }
    };
    expect(player(state, action)).toEqual(newState);
  });
});
