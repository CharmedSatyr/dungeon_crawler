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
