import grid from '../index';
import { initialState } from '../index';
import * as t from '../../../constants/action-types';

describe('`grid` reducer', () => {
  const expected = {
    data: expect.arrayContaining([]),
    level: expect.any(Number),
    playerPosition: {
      coordinates: {
        x: expect.any(Number),
        y: expect.any(Number),
      },
      index: expect.any(Number),
    },
  };

  it('should return an object with `data`, `level`, `playerPosition` properties of the right types and shapes', () => {
    let action = {};
    // `undefined` state passes the default initialState
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `ADD_ITEM` action type', () => {
    const action = {
      targetObj: {
        payload: { loot: { item: { name: 'example' } } },
      },
      type: t.ADD_ITEM,
    };
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `ADD_GOLD` action type', () => {
    const action = {
      amount: 100,
      targetObj: {
        payload: { loot: { name: 'gold', amount: 100 } },
      },
      type: t.ADD_GOLD,
    };
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `ATTACK` action type', () => {
    const action = {
      damage: expect.any(Number),
      targetObj: { payload: { enemy: {} } },
      type: t.ATTACK,
    };
    expect.assertions(1);
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `DRINK` action type', () => {
    const action = {
      targetObj: { payload: { loot: { barrel: {} } } },
      type: t.DRINK,
    };
    expect.assertions(1);
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `FACING` action type', () => {
    const action = { targetObj: expect.any(Object), flag: expect.any(String), type: t.FACING };
    expect.assertions(1);
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should restore grid `initialState` on `GAME_OVER` action type', () => {
    const action = { type: t.GAME_OVER };
    const currentState = {
      data: [{ index: 0 }],
      playerPosition: 'whatever',
    };
    // Imported initialState from grid index
    expect(grid(currentState, action)).toEqual(initialState);
  });

  it('should preserve state shape on `MOVE` action type', () => {
    const mockData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: {} } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const targetObj = mockData[1];
    const action = { targetObj, type: t.MOVE };
    const mockState = {
      data: mockData,
      level: 1,
      playerPosition: {
        coordinates: { x: 0, y: 0 },
        index: 0,
      },
    };
    expect.assertions(1);
    expect(grid(mockState, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `MOVE_ENEMY` action type', () => {
    const mockData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { enemy: { facing: 'south' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
      { coordinates: { x: 2, y: 0 }, index: 2, payload: { player: {} } },
    ];
    const enemyPosition = mockData[0];
    const targetObj = mockData[1];
    const action = { enemyPosition, targetObj, type: t.MOVE_ENEMY };
    const mockState = {
      data: mockData,
      level: 1,
      playerPosition: {
        coordinates: { x: 2, y: 0 },
        index: 2,
      },
    };
    expect.assertions(1);
    expect(grid(mockState, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `NEXT_LEVEL` action type', () => {
    const action = { type: t.NEXT_LEVEL };
    expect.assertions(1);
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });

  it('should preserve state shape on `OPEN` action type', () => {
    const action = { targetObj: { payload: { loot: { barrel: {} } } }, type: t.OPEN };
    expect.assertions(1);
    expect(grid(undefined, action)).toEqual(expect.objectContaining(expected));
  });
});
