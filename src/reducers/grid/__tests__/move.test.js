import move from '../move';

describe('`move` grid reducer', () => {
  it('should return an object with `data` and `position` properties', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = data[0];
    const targetObj = data[1];
    expect(move(data, originPosition, targetObj)).toHaveProperty('data');
    expect(move(data, originPosition, targetObj)).toHaveProperty('position');
  });

  it('should return an object with a `data` property that is an array', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = data[1];
    expect(Array.isArray(move(data, originPosition, targetObj).data)).toBeTruthy();
  });

  it('should return an object with a `position` property that has `coordinates` and `index` properties of the correct shape/type', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = data[1];
    const positionShape = {
      coordinates: {
        x: expect.any(Number),
        y: expect.any(Number),
      },
      index: expect.any(Number),
    };
    expect(move(data, originPosition, targetObj).position).toMatchObject(positionShape);
  });

  it('should update the targetObj payload to `player` if the object at `originPosition` has a `player` payload', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = data[1];

    const updatedData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: {} },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: { player: { facing: 'east' } } },
    ];
    expect(move(data, originPosition, targetObj).data).toEqual(updatedData);
  });

  it('should update the targetObj payload to `enemy` if the object at `originPosition` has a living `enemy` payload', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { enemy: { facing: 'west', health: 10 } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const targetObj = data[1];
    const updatedData = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: {} },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: { enemy: { facing: 'east', health: 10 } } },
    ];
    expect(move(data, originPosition, targetObj).data).toEqual(updatedData);
  });

  it('should update the object at `originPosition` to not have a `player` payload if the `originPosition` argument had a `player` payload', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { player: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = data[0];
    const targetObj = data[1];
    const resultData = move(data, originPosition, targetObj).data;
    const updatedOriginPosition = resultData[0];
    expect(updatedOriginPosition.payload).not.toHaveProperty('player');
  });

  it('should update the object at `originPosition` to not have an `enemy` payload if the `originPosition` had an `enemy` payload', () => {
    const data = [
      { coordinates: { x: 0, y: 0 }, index: 0, payload: { enemy: { facing: 'west' } } },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = data[0];
    const targetObj = data[1];
    const resultData = move(data, originPosition, targetObj).data;
    const updatedOriginPosition = resultData[0];
    expect(updatedOriginPosition.payload).not.toHaveProperty('enemy');
  });

  it('should NOT remove dead enemies from `originPosition` payloads', () => {
    const data = [
      {
        coordinates: { x: 0, y: 0 },
        index: 0,
        payload: { player: { facing: 'west' }, enemy: { facing: 'west', health: 0 } },
      },
      { coordinates: { x: 1, y: 0 }, index: 1, payload: {} },
    ];
    const originPosition = data[0];
    const targetObj = data[1];
    const resultData = move(data, originPosition, targetObj).data;
    console.log('resultData:', resultData);
    const updatedOriginPosition = resultData[0];
    const updatedTargetObj = resultData[1];
    expect(updatedOriginPosition.payload).toHaveProperty('enemy');
    expect(updatedTargetObj.payload).toHaveProperty('player');
  });
});
