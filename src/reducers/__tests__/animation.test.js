import animation from '../animation';
import * as t from '../../constants/action-types';

describe('`animation` reducer', () => {
  const initialState = { player: '' };

  it('should change `state.player` to `attack` on `ATTACK` action', () => {
    const action = { type: t.ATTACK };
    const updatedState = { player: 'attack' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should reset the player animation to an empty string on `CLEAR_ANIMATION` action', () => {
    const initialState = { player: 'move' };
    const action = { type: t.CLEAR_ANIMATION };
    const updatedState = { player: '' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should reset the enemy animation to an empty string on `CLEAR_ENEMY_ANIMATION` action', () => {
    const initialState = { enemy: 'attack' };
    const action = { type: t.CLEAR_ENEMY_ANIMATION };
    const updatedState = { enemy: '' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should change `state.player` to `move` on `MOVE` action', () => {
    const action = { type: t.MOVE };
    const updatedState = { player: 'move' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });
});
