import { GRID_WIDTH } from '../constants/settings';

// Establish the player's potential next position given current position and direction
export const getTargetPosition = (playerPosition, direction) => {
  switch (direction) {
    case 'north':
      return {
        coordinates: { x: playerPosition.coordinates.x, y: playerPosition.coordinates.y - 1 },
        index: playerPosition.index - GRID_WIDTH
      };
    case 'east':
      return {
        coordinates: { x: playerPosition.coordinates.x + 1, y: playerPosition.coordinates.y },
        index: playerPosition.index + 1
      };
    case 'south':
      return {
        coordinates: { x: playerPosition.coordinates.x, y: playerPosition.coordinates.y + 1 },
        index: playerPosition.index + GRID_WIDTH
      };
    case 'west':
      return {
        coordinates: { x: playerPosition.coordinates.x - 1, y: playerPosition.coordinates.y },
        index: playerPosition.index - 1
      };
    default:
      return playerPosition;
  }
};
