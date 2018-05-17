import * as p from '../populate';
import populate from '../populate';

const defaultType = 'default';
const pathType = 'path';

describe('`direction` populate grid reducer function', () => {
  it('should return a string matching a cardinal direction', () => {
    expect(p.direction()).toMatch(/[north||south||east||west]/);
  });
});

describe('`addEnemies` populate grid reducer function', () => {
  const pathType = 'floor';
  const data = [{ payload: {}, type: pathType }];
  it('should return an array', () => {
    const probability = 0;
    expect(Array.isArray(p.addEnemies(data, pathType, probability))).toBeTruthy();
  });

  it('should give data objects an `enemy` payload if `probability` is 1', () => {
    const enemy = {
      facing: expect.any(String),
      health: expect.any(Number),
      level: expect.any(Number),
      weapon: expect.any(Object),
    };
    const updatedData = [{ payload: { enemy }, type: pathType }];
    expect(p.addEnemies(data, pathType, 1)).toEqual(updatedData);
  });

  it('should return the data argument if `probability` is 0', () => {
    expect(p.addEnemies(data, pathType, 0)).toEqual(data);
  });

  it('should not modify objects that already have payloads', () => {
    const hasPayload = [{ payload: { thingy: 1 }, type: pathType }];
    expect(p.addEnemies(hasPayload, pathType, 1)).toEqual(hasPayload);
  });
});

describe('`clearTheDoor` populate grid reducer function', () => {
  /*
   * SAMPLE GRID
   * |-----+-----+-----+-----+-----|
   * |  0  |  1  |  2  |  3  |  4  |
   * |-----+-----+-----+-----+-----|
   * |  5  |  6  | PTH | PTH |  9  |
   * |-----+-----+-----+-----+-----|
   * | PTH | PTH | PTH | PTH |  14 |
   * |-----+-----+-----+-----+-----|
   * |  15 |  16 |  17 | PTH |  19 |
   * |-----+-----+-----+-----+-----|
   * |  20 |  21 |  22 | PTH |  24 |
   * |-----+-----+-----+-----+-----|
   * Loot can go on 7, 8
   * It can't go on 11, 12, 13, 18
   * 10 & 23 are only there to give 11 & 18 paths on either side
   */

  const data = [
    { index: 0, type: defaultType },
    { index: 1, type: defaultType },
    { index: 2, type: defaultType },
    { index: 3, type: defaultType },
    { index: 4, type: defaultType },
    { index: 5, type: defaultType },
    { index: 6, type: defaultType },
    { index: 7, type: pathType },
    { index: 8, type: pathType },
    { index: 9, type: defaultType },
    { index: 10, type: pathType },
    { index: 11, type: pathType },
    { index: 12, type: pathType },
    { index: 13, type: pathType },
    { index: 14, type: defaultType },
    { index: 15, type: defaultType },
    { index: 16, type: defaultType },
    { index: 17, type: defaultType },
    { index: 18, type: pathType },
    { index: 19, type: defaultType },
    { index: 20, type: defaultType },
    { index: 21, type: defaultType },
    { index: 22, type: defaultType },
    { index: 23, type: pathType },
    { index: 24, type: defaultType },
  ];
  const gridWidth = 5;
  it('should return a Boolean', () => {
    for (let i; i < data.length; i++) {
      expect(
        typeof p.clearTheDoor(data, i, gridWidth, defaultType, pathType) === Boolean
      ).toBeTruthy();
    }
  });

  it('should return true on a path away from a doorway', () => {
    expect(p.clearTheDoor(data, 7, gridWidth, defaultType, pathType)).toBeTruthy();
    expect(p.clearTheDoor(data, 8, gridWidth, defaultType, pathType)).toBeTruthy();
  });

  it('should return false on a path in or beside a doorway', () => {
    [11, 12, 13, 18].forEach(i =>
      expect(p.clearTheDoor(data, i, gridWidth, defaultType, pathType)).toBeFalsy()
    );
  });
});
