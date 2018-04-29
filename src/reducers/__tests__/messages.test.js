import messages from '../messages';
import * as t from '../../constants/action-types';

describe('`messages` reducer', () => {
  it('should return an array of strings', () => {
    const initialState = ['str'];
    const action = { type: t.MESSAGE, message: 'msg' };
    expect(messages(initialState, action)).toEqual(expect.arrayContaining(initialState));
  });

  it('should update state to contain new `action.message` input');
  it('should never be more than three items long');
});
