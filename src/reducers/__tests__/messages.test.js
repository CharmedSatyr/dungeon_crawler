import messages from '../messages';
import * as t from '../../constants/action-types';

describe('`messages` reducer', () => {
  it('should return an array of strings', () => {
    const initialState = ['str'];
    const action = { type: t.MESSAGE, msg: 'msg' };
    expect(messages(initialState, action)).toEqual(expect.arrayContaining(initialState));
  });

  it('should update state to contain new `action.message` input', () => {
    const initialState = ['str'];
    const action = { type: t.MESSAGE, msg: 'msg' };
    const result = ['str', 'msg'];
    expect(messages(initialState, action)).toEqual(result);
  });

  it('should contain only the newest three messages', () => {
    const initialState = ['str', 'a', 'b'];
    const action = { type: t.MESSAGE, msg: 'c' };
    const result = ['a', 'b', 'c'];
    expect(messages(initialState, action)).toEqual(result);
  });
});
