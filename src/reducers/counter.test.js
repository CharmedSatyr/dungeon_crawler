import counter from './counter';

describe('counter reducer', () => {
  it('should return incremented or decremented state', () => {
    const initialState = {
      count: 20
    };
    //    expect(counter(20, { type: 'DECREMENT' })).toEqual({
    // count: 19;
    // });
    expect(counter(20, { type: 'INCREMENT' })).toEqual(21);
  });
});
