import * as a from '../index';
import * as t from '../../constants/action-types';
import { GRID_WIDTH } from '../../constants/settings';

/*** SIMPLE ACTION CREATORS ***/
describe('add_xp action creator', () => {
  it('should return an action to add experience to the player', () => {
    const args = 56;
    const action = { type: t.ADD_XP, amount: 56 };
    expect(a.add_xp(args)).toEqual(action);
  });
});

describe('attack action creator', () => {
  it('should return an action to attack an object in a direction', () => {
    const args = ['north', { a: 0 }, { b: 1 }];
    const action = {
      type: t.ATTACK,
      direction: args[0],
      targetPosition: args[1],
      targetObj: args[2]
    };

    expect(a.attack(...args)).toEqual(action);
  });
});

describe('facing action creator', () => {
  it('should return an action to set the direction a target is facing', () => {
    const args = ['north', { x: 0, y: 0 }];
    const action = { type: t.FACING, direction: args[0], targetPosition: args[1] };
    expect(a.facing(...args)).toEqual(action);
  });
});

describe('move action creator', () => {
  it('should return an action to move an target in a direction', () => {
    const args = ['north', { x: 0, y: 0 }, { type: 'target' }];
    const action = {
      type: t.MOVE,
      direction: args[0],
      targetPosition: args[1],
      targetObj: args[2]
    };
    expect(a.move(...args)).toEqual(action);
  });
});

describe('level_up action creator', () => {
  it('should return an action to level up the player', () => {
    const action = { type: t.LEVEL_UP };
    expect(a.level_up()).toEqual(action);
  });
});

describe('message action creator', () => {
  it('should return an action to display a message', () => {
    const args = 'test!';
    const action = {
      type: t.MESSAGE,
      msg: args
    };
    expect(a.message(args)).toEqual(action);
  });
});

describe('next_level action creator', () => {
  it('should return an action to advance the player to the next game level', () => {
    const action = { type: t.NEXT_LEVEL };
    expect(a.next_level()).toEqual(action);
  });
});

describe('open action creator', () => {
  it('should return an action to open a door or other target object', () => {
    const args = ['north', { x: 0, y: 0 }, { type: 'target' }];
    const action = {
      type: t.OPEN,
      direction: args[0],
      targetPosition: args[1],
      targetObj: args[2]
    };
    expect(a.open(...args)).toEqual(action);
  });
});

describe('take_damage action creator', () => {
  it('should return an action to cause the player to take a specified amount of damage', () => {
    const args = 12;
    const action = { type: t.TAKE_DAMAGE, damage: 12 };
    expect(a.take_damage(args)).toEqual(action);
  });
});

/*** THUNKS ***/
describe('hostile_enemies action creator thunk', () => {
  it('should trigger `facing`, `message`, and `take_damage` action creators', () => {
    const enemy = {
      facing: 'west',
      health: 40,
      level: 4,
      weapon: { name: 'Spear', min_damage: 3, max_damage: 7 }
    };
    const e = { coordinates: { x: 1, y: 0 }, index: 1 };
    const n = { coordinates: { x: 0, y: -1 }, index: -GRID_WIDTH };
    const s = { coordinates: { x: 0, y: 1 }, index: GRID_WIDTH };
    const w = { coordinates: { x: -1, y: 0 }, index: -1 };
    const target = { e };
    const pap = [e, n, s, w];
    const batchAction = {
      payload: [{ type: t.FACING }, { type: t.MESSAGE }, { type: t.TAKE_DAMAGE }],
      type: 'BATCHING_REDUCER.BATCH'
    };
    expect(a.hostile_enemies(enemy, target, pap)).toMatchObject(batchAction);
  });
});

// TODO: Refactor thunks to allow easier testing
describe('player_input action creator thunk', () => {
  // it('should trigger the appropriate action creators on player input...', () => {});
  it('should not be null or undefined', () => {
    expect.anything();
  });
});
