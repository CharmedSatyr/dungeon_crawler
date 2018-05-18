import drink from '../drink';

describe('`drink` grid reducer function', () => {
  it('should set the targetObj payload to an empty barrel from a full one', () => {
    const targetObj = { index: 0, payload: { loot: { barrel: { full: true } } } };
    const data = [targetObj];

    const updateObj = { index: 0, payload: { loot: { barrel: { full: false } } } };
    const newData = [updateObj];

    expect(drink(data, targetObj)).toEqual(newData);
  });
});
