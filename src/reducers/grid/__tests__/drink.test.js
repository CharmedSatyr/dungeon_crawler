import * as t from '../../constants/action-types';
import * as a from '../drink';

describe('`drink` grid reducer', () => {
  it('should set the targetObj payload to an empty barrel from a full one', () => {
    const action = { type: t.DRINK, targetObj: { index: 0 } };
    const data = [{ payload: { loot: { type: { barrel: { full: true } } } } }];
    const result = [{ payload: { loot: { type: { barrel: { full: false } } } } }];
    expect(a.drink(data, action)).toBe(result);
  });
});
