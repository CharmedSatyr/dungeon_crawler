import * as p from '../populate';
import populate from '../populate';

describe('`direction` populate grid reducer function', () => {
  it('should return a string matching a cardinal direction', () => {
    expect(p.direction()).toMatch(/[north||south||east||west]/);
  });
});

describe('`addEnemies` populate grid reducer function', () => {
  const pathType = 'floor';
  const data = [{ payload: {}, type: pathType }];
  it('should return an array', () => {
    const pathType = 'floor';
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
