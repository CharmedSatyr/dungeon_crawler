import * as actions from './index';
import * as t from '../constants/action-types';

describe('increment', () => {
  it('should create an action to increment the counter', () => {
    const expectedAction = {
      type: t.INCREMENT
    };
    expect(actions.increment()).toEqual(expectedAction);
  });
});

describe('decrement', () => {
  it('should create an action to decrement the counter', () => {
    const expectedAction = {
      type: t.DECREMENT
    };
    expect(actions.decrement()).toEqual(expectedAction);
  });
});

describe('toggleCell', () => {
  it("should create an action to toggle a cell's active status", () => {
    const index = 0;
    const expectedAction = {
      type: t.TOGGLE_CELL,
      index
    };
    expect(actions.toggleCell(index)).toEqual(expectedAction);
  });
});

describe('updatePosition', () => {
  it("should create an action to return a cell's index", () => {
    const index = 0;
    const expectedAction = {
      type: t.UPDATE_POSITION,
      index
    };
    expect(actions.updatePosition(index)).toEqual(expectedAction);
  });
});
