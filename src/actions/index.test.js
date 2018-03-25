import * as actions from './index';

describe('increment', () => {
  it('should create an action to increment the counter', () => {
    const expectedAction = {
      type: 'INCREMENT'
    };
    expect(actions.increment()).toEqual(expectedAction);
  });
});

describe('decrement', () => {
  it('should create an action to decrement the counter', () => {
    const expectedAction = {
      type: 'DECREMENT'
    };
    expect(actions.decrement()).toEqual(expectedAction);
  });
});

describe('toggleCell', () => {
  it("should create an action to toggle a cell's active status", () => {
    const index = 0;
    const expectedAction = {
      type: 'TOGGLE_CELL',
      index
    };
    expect(actions.toggleCell(index)).toEqual(expectedAction);
  });
});

describe('updatePosition', () => {
  it("should create an action to return a cell's index", () => {
    const index = 0;
    const expectedAction = {
      type: 'UPDATE_POSITION',
      index
    };
    expect(actions.updatePosition(index)).toEqual(expectedAction);
  });
});
