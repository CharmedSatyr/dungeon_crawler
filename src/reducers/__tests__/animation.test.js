import animation from '../animation';
import * as t from '../../constants/action-types';

describe('`animation` reducer', () => {
  it('should add `attack` to `state.player` array on `ATTACK` action', () => {
    const initialState = { player: [''] };
    const action = { type: t.ATTACK };
    const updatedState = { player: ['', 'attack'] };
    expect(animation(initialState, action)).toEqual(updatedState);
  });
  it('should add `move` to the `state.player` array on `MOVE` action', () => {
    const initialState = { player: [''] };
    const action = { type: t.MOVE };
    const updatedState = { player: ['', 'move'] };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should reset the animation array to an empty string on `CLEAR_ANIMATION` action', () => {
    const initialState = { player: ['', 'move'] };
    const action = { type: t.CLEAR_ANIMATION };
    const updatedState = { player: [''] };
    expect(animation(initialState, action)).toEqual(updatedState);
  });
});
