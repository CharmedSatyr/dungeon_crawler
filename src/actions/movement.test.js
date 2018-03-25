import * as actions from './movement';

describe('moveEast', () => {
  it('should create an action to move player right if not at a boundary', () => {
    const position = 0;
    const expectedAction = {
      type: 'MOVE_EAST',
      position
    };

    expect(actions.moveEast(position)).toEqual(expectedAction);
  });
});

describe('moveNorth', () => {
  it('should create an action to move player up if not at a boundary', () => {
    const position = 0;
    const expectedAction = {
      type: 'MOVE_NORTH',
      position
    };

    expect(actions.moveNorth(position)).toEqual(expectedAction);
  });
});

describe('moveSouth', () => {
  it('should create an action to move player down if not at a boundary', () => {
    const position = 0;
    const expectedAction = {
      type: 'MOVE_SOUTH',
      position
    };

    expect(actions.moveSouth(position)).toEqual(expectedAction);
  });
});

describe('moveWest', () => {
  it('should create an action to move player left if not at a boundary', () => {
    const position = 0;
    const expectedAction = {
      type: 'MOVE_WEST',
      position
    };

    expect(actions.moveWest(position)).toEqual(expectedAction);
  });
});
