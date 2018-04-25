import * as h from '../index.helpers';
import { GRID_WIDTH } from '../../constants/settings';

describe('getTargetPosition', () => {
  it('should return the coordinates and index of the cell the source (usually player) is moving to', () => {
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };

    expect(h.getTargetPosition(originPosition, 'north')).toEqual({
      coordinates: { x: 0, y: -1 },
      index: -GRID_WIDTH
    });

    expect(h.getTargetPosition(originPosition, 'east')).toEqual({
      coordinates: { x: 1, y: 0 },
      index: 1
    });

    expect(h.getTargetPosition(originPosition, 'south')).toEqual({
      coordinates: { x: 0, y: 1 },
      index: GRID_WIDTH
    });

    expect(h.getTargetPosition(originPosition, 'west')).toEqual({
      coordinates: { x: -1, y: 0 },
      index: -1
    });
  });
});

describe('playerAdjacentPositions', () => {
  it('should return an array of coordinate/index objects for cells adjacent to player in order east, north, south, west', () => {
    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const e = { coordinates: { x: 1, y: 0 }, index: 1 };
    const n = { coordinates: { x: 0, y: -1 }, index: -GRID_WIDTH };
    const s = { coordinates: { x: 0, y: 1 }, index: GRID_WIDTH };
    const w = { coordinates: { x: -1, y: 0 }, index: -1 };
    expect(h.playerAdjacentPositions(playerPosition)).toEqual([e, n, s, w]);
  });
});
//
//describe('facePlayer', () => {
//  it('should return direction entity should face to face player if position is adjacent to player, else null', () => {
//    const
//    const playerPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
//  })
//})
//
