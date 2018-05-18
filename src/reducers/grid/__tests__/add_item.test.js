import add_item from '../add_item';

describe('`add_item` grid reducer function', () => {
  it('should remove the item from the targetObj loot payload', () => {
    const targetObj = { index: 0, payload: { loot: { item: {} } } };
    const data = [targetObj];

    const updateObj = { index: 0, payload: {} };
    const newData = [updateObj];

    expect(add_item(data, targetObj)).toEqual(newData);
  });
});
