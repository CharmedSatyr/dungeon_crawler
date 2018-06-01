import { GRID_WIDTH } from '../constants/settings';

export const getDirection = (originPosition, targetPosition) => {
  if (
    originPosition.coordinates.x + 1 === targetPosition.coordinates.x &&
    originPosition.coordinates.y === targetPosition.coordinates.y
  ) {
    return 'east';
  }
  if (
    originPosition.coordinates.x === targetPosition.coordinates.x &&
    originPosition.coordinates.y - 1 === targetPosition.coordinates.y
  ) {
    return 'north';
  }
  if (
    originPosition.coordinates.x === targetPosition.coordinates.x &&
    originPosition.coordinates.y + 1 === targetPosition.coordinates.y
  ) {
    return 'south';
  }
  if (
    originPosition.coordinates.x - 1 === targetPosition.coordinates.x &&
    originPosition.coordinates.y === targetPosition.coordinates.y
  ) {
    return 'west';
  }
  return null;
};

// Establish the player's potential next position given current position and direction
export const getTargetPosition = (originPosition, direction, gridWidth = GRID_WIDTH) => {
  switch (direction) {
    case 'north':
      return {
        coordinates: { x: originPosition.coordinates.x, y: originPosition.coordinates.y - 1 },
        index: originPosition.index - gridWidth,
      };
    case 'east':
      return {
        coordinates: { x: originPosition.coordinates.x + 1, y: originPosition.coordinates.y },
        index: originPosition.index + 1,
      };
    case 'south':
      return {
        coordinates: { x: originPosition.coordinates.x, y: originPosition.coordinates.y + 1 },
        index: originPosition.index + gridWidth,
      };
    case 'west':
      return {
        coordinates: { x: originPosition.coordinates.x - 1, y: originPosition.coordinates.y },
        index: originPosition.index - 1,
      };
    default:
      return originPosition;
  }
};

// Return positions of cells adjacent to argument
export const adjacentPositions = (originPosition, gridWidth = GRID_WIDTH) => {
  const e = getTargetPosition(originPosition, 'east', gridWidth);
  const n = getTargetPosition(originPosition, 'north', gridWidth);
  const s = getTargetPosition(originPosition, 'south', gridWidth);
  const w = getTargetPosition(originPosition, 'west', gridWidth);

  return [e, n, s, w];
};

// Return direction entity should be facing
// to face player if position is adjacent to player
// NOTE: the adjacent cell objects are passed in explicitly to avoid
// weird closure/object inequality issues. Do not change this!
export const facePlayer = (
  target,
  playerAdjacentEast,
  playerAdjacentNorth,
  playerAdjacentSouth,
  playerAdjacentWest
) => {
  switch (target) {
    case playerAdjacentWest:
      return 'east';
    case playerAdjacentSouth:
      return 'north';
    case playerAdjacentNorth:
      return 'south';
    case playerAdjacentEast:
      return 'west';
    default:
      return null;
  }
};
