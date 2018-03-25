import counter from './counter';

describe('counter reducer', () => {
  it('should return incremented state on INCREMENT', () => {
    expect(counter(20, { type: 'INCREMENT' })).toEqual(21);
  });
  it('should return decremented state on DECREMENT', () => {
    expect(counter(20, { type: 'DECREMENT' })).toEqual(19);
  });
});
