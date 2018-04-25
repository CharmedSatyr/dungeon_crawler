import { getTargetPosition } from '../index.helpers';
import { GRID_WIDTH } from '../../constants/settings';

describe('getTargetPosition', () => {
  it('should return the coordinates and index of the cell the source (usually player) is moving to', () => {
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };

    expect(getTargetPosition(originPosition, 'north')).toEqual({
      coordinates: { x: 0, y: -1 },
      index: -GRID_WIDTH
    });

    expect(getTargetPosition(originPosition, 'east')).toEqual({
      coordinates: { x: 1, y: 0 },
      index: 1
    });

    expect(getTargetPosition(originPosition, 'south')).toEqual({
      coordinates: { x: 0, y: 1 },
      index: GRID_WIDTH
    });

    expect(getTargetPosition(originPosition, 'west')).toEqual({
      coordinates: { x: -1, y: 0 },
      index: -1
    });
  });
});
