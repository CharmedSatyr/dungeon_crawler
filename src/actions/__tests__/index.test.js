import * as a from '../index';
import * as t from '../../constants/action-types';

/*** SIMPLE ACTION CREATORS ***/
describe('add_xp action creator', () => {
  it('should return an action to add experience to the player', () => {
    const args = 56;
    const action = { type: t.ADD_XP, amount: 56 };
    expect(a.add_xp(args)).toEqual(action);
  });
});

// describe('attack action creator', () => {
//   it('should return an action to attack an object in a direction', () => {
//     const args = ['north', { a: 0 }, { b: 1 }];
//     const action = {
//       type: t.ATTACK,
//       direction: args[0],
//       targetPosition: args[1],
//       targetObj: args[2]
//     };
//
//     expect(a.attack(...args)).toEqual(action);
//   });
// });

describe('facing action creator', () => {
  it('should return an action to set the direction an entity is facing', () => {
    const enemyObj = {
      coordinates: { x: expect.any(Number), y: expect.any(Number) },
      payload: {
        enemy: {
          facing: expect.any(String)
        }
      }
    };
    const playerObj = {
      coordinates: { x: expect.any(Number), y: expect.any(Number) },
      payload: {
        enemy: {
          facing: expect.any(String)
        }
      }
    };

    const enemyArgs = [enemyObj, 'enemy'];
    const playerArgs = [playerObj];
    const action_noFlag = {
      type: t.FACING,
      targetObj: expect(playerArgs[0]),
      flag: expect.not.anything()
    };
    const action = {
      type: t.FACING,
      targetObj: expect.objectContaining(enemyArgs[0]),
      flag: expect(enemyArgs[1])
    };
    expect(a.facing(...playerArgs)).toMatchObject(action_noFlag);
    expect(a.facing(...enemyArgs)).toMatchObject(action);
  });
});

describe('move action creator', () => {
  it('should return an action to move to a target position', () => {
    const args = [{ x: 0, y: 0 }];
    const action = {
      type: t.MOVE,
      targetObj: args[0]
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
    const args = [{ x: 0, y: 0 }];
    const action = {
      type: t.OPEN,
      targetObj: args[0]
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
    const targetObj = {
      coordinates: {},
      index: expect.any(Number),
      payload: {
        enemy: {
          weapon: {
            min_damage: expect.any(Number),
            max_damage: expect.any(Number)
          }
        }
      }
    };
    const batchAction = {
      payload: [
        { type: t.FACING, targetObj },
        { type: t.MESSAGE, msg: expect.any(String) },
        { type: t.TAKE_DAMAGE, damage: expect.any(Number) }
      ],
      type: 'BATCHING_REDUCER.BATCH'
    };
    expect(a.hostile_enemies(targetObj)).toMatchObject(batchAction);
  });
});

// TODO: Refactor thunks to allow easier testing
describe('player_input action creator thunk', () => {
  // it('should trigger the appropriate action creators on player input...', () => {});
  it('should not be null or undefined', () => {
    expect.anything();
  });
});
