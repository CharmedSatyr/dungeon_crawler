import counter from './counter';
import * as t from '../constants/action-types';

describe('counter reducer', () => {
  it('should return incremented state on INCREMENT', () => {
    expect(counter(20, { type: t.INCREMENT })).toEqual(21);
  });
  it('should return decremented state on DECREMENT', () => {
    expect(counter(20, { type: t.DECREMENT })).toEqual(19);
  });
});
