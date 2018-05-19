import drink from '../drink';

describe('`drink` grid reducer function', () => {
  const targetObj = { index: 0, payload: { loot: { barrel: { full: true } } } };
  const updateObj = { index: 0, payload: { loot: { barrel: { full: false } } } };
  it('should set the targetObj payload to an empty barrel from a full one', () => {
    const data = [targetObj];
    const newData = [updateObj];
    expect(drink(data, targetObj)).toEqual(newData);
  });

  it('should not change the payload of any other object', () => {
    const bystanderObj = { index: 1, payload: { loot: { barrel: { full: true } } } };
    const data = [targetObj, bystanderObj];
    const newData = [updateObj, bystanderObj];
    expect(drink(data, targetObj)).toEqual(newData);
  });
});
