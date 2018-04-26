import { GRID_WIDTH } from '../constants/settings';

// Establish the player's potential next position given current position and direction
export const getTargetPosition = (originPosition, direction) => {
  switch (direction) {
    case 'north':
      return {
        coordinates: { x: originPosition.coordinates.x, y: originPosition.coordinates.y - 1 },
        index: originPosition.index - GRID_WIDTH
      };
    case 'east':
      return {
        coordinates: { x: originPosition.coordinates.x + 1, y: originPosition.coordinates.y },
        index: originPosition.index + 1
      };
    case 'south':
      return {
        coordinates: { x: originPosition.coordinates.x, y: originPosition.coordinates.y + 1 },
        index: originPosition.index + GRID_WIDTH
      };
    case 'west':
      return {
        coordinates: { x: originPosition.coordinates.x - 1, y: originPosition.coordinates.y },
        index: originPosition.index - 1
      };
    default:
      return originPosition;
  }
};

// Return positions of cells adjacent to player
export const playerAdjacentPositions = playerPosition => {
  const e = getTargetPosition(playerPosition, 'east');
  const n = getTargetPosition(playerPosition, 'north');
  const s = getTargetPosition(playerPosition, 'south');
  const w = getTargetPosition(playerPosition, 'west');

  return [e, n, s, w];
};

// Return direction entity should be facing
// to face player if position is adjacent to player
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
