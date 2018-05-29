import animation from '../animation';
import * as t from '../../constants/action-types';

describe('`animation` reducer', () => {
  it('should change `state.player` to `attack` on `ATTACK` action', () => {
    const initialState = { player: '', enemy: {} };
    const action = { type: t.ATTACK };
    const updatedState = { player: 'attack', enemy: {} };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should reset the player animation to an empty string on `CLEAR_ANIMATION` action', () => {
    const initialState = { player: 'move' };
    const action = { type: t.CLEAR_ANIMATION };
    const updatedState = { player: '' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should reset the enemy animation to an empty object on `CLEAR_ENEMY_ANIMATION` action', () => {
    const initialState = { enemy: { 1: 'attack' } };
    const action = { type: t.CLEAR_ENEMY_ANIMATION };
    const updatedState = { enemy: {} };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should change `state.player` to `move` on `MOVE` action', () => {
    const initialState = { player: '' };
    const action = { type: t.MOVE };
    const updatedState = { player: 'move' };
    expect(animation(initialState, action)).toEqual(updatedState);
  });

  it('should change enemy animations per `action.index` to `attack` on `TAKE_DAMAGE` action', () => {
    const initialState = { enemy: {} };
    const action = { index: 0, type: t.TAKE_DAMAGE };
    const updatedState = { enemy: { 0: 'attack' } };
    expect(animation(initialState, action)).toEqual(updatedState);
  });
});
