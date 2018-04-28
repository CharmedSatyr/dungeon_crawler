import * as h from '../index.helpers';
import { GRID_WIDTH } from '../../constants/settings';

describe('getDirection', () => {
  it('should return the direction an entity is moving, given origin and target positions', () => {
    // arguments = origin, target
    const originPosition = { coordinates: { x: 0, y: 0 }, index: 0 };
    const e = { coordinates: { x: 1, y: 0 }, index: 1 };
    const n = { coordinates: { x: 0, y: -1 }, index: -GRID_WIDTH };
    const s = { coordinates: { x: 0, y: 1 }, index: GRID_WIDTH };
    const w = { coordinates: { x: -1, y: 0 }, index: -1 };
    expect(h.getDirection(originPosition, e)).toBe('east');
    expect(h.getDirection(originPosition, n)).toBe('north');
    expect(h.getDirection(originPosition, s)).toBe('south');
    expect(h.getDirection(originPosition, w)).toBe('west');
  });
});

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

describe('facePlayer', () => {
  it('should return direction entity should face to face player if position is adjacent to player, else null', () => {
    // e, n, s, w are all adjacent to the player
    const e = { coordinates: { x: 1, y: 0 }, index: 1 };
    const n = { coordinates: { x: 0, y: -1 }, index: -GRID_WIDTH };
    const s = { coordinates: { x: 0, y: 1 }, index: GRID_WIDTH };
    const w = { coordinates: { x: -1, y: 0 }, index: -1 };
    const adjacent = [e, n, s, w];

    expect(h.facePlayer(e, ...adjacent)).toBe('west');
    expect(h.facePlayer(n, ...adjacent)).toBe('south');
    expect(h.facePlayer(s, ...adjacent)).toBe('north');
    expect(h.facePlayer(w, ...adjacent)).toBe('east');
    expect(h.facePlayer(null, ...adjacent)).toBe(null);
  });
});
