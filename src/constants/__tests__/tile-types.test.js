import tileTypes from '../tile-types';

describe('tileTypes', () => {
  it('should return appropriate tile types for each level and type', () => {
    expect(tileTypes(0)).toBe('vines');
    expect(tileTypes(0, 'path')).toBe('dirtPath');
    expect(tileTypes(2)).toBe('rock1');
    expect(tileTypes(2, 'path')).toBe('stonePath');
    expect(tileTypes(4)).toBe('lava');
    expect(tileTypes(4, 'path')).toBe('stonePath');
  });
});
