import { GRID_WIDTH } from '../constants/settings';

export const movement = (data, playerPosition, direction) => {
  // Establish the player's potential next position given current position and direction
  const getNextPlayerPosition = (playerPosition, direction) => {
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

  // Save it
  const nextPlayerPosition = getNextPlayerPosition(playerPosition, direction);

  // Get the potential next player object
  const nextPlayerObj = data[nextPlayerPosition.index];

  // Check if the nextPosition is a floor
  const validateNextPosition = nextPlayerObj => {
    if (nextPlayerObj.type === 1 && !nextPlayerObj.enemy) {
      return true;
    } else {
      return false;
    }
  };

  // Update the grid data if the movement is valid
  if (validateNextPosition(nextPlayerObj)) {
    // This way of deep copying the data array works so long as there are no methods stored in data!
    // Could also map like newState = data.map(c => Object.assign({}, c)), but a map seems less performative?
    let newData = JSON.parse(JSON.stringify(data));

    // The player is no longer at its current position
    const currentPlayerObj = data[playerPosition.index];
    newData.splice(playerPosition.index, 1, Object.assign({}, currentPlayerObj, { player: false }));

    // The player is at the next position
    newData.splice(
      nextPlayerPosition.index,
      1,
      Object.assign({}, nextPlayerObj, { player: { direction } })
    );

    return {
      data: newData,
      playerPosition: {
        coordinates: nextPlayerPosition.coordinates,
        index: nextPlayerPosition.index
      }
    };
  }

  // Otherwise return current values
  return { data, playerPosition };
};
