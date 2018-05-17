import grid from '../index';
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
