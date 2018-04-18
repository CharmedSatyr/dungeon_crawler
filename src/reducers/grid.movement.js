export const movement = (state, direction) => {
  // Find the current player object
  const getPlayerObj = state => {
    return state.find(cell => cell.player);
  };

  // Save it as a variable
  const currentPlayerObj = getPlayerObj(state);

  // Save its coordinates and index
  const currentPlayerPosition = currentPlayerObj.coordinates;
  const currentPlayerIndex = state.indexOf(currentPlayerObj);

  // Establish the player's potential next position given current position and direction
  const getNextPlayerPosition = (currentPlayerPosition, direction) => {
    switch (direction) {
      case 'north':
        return { x: currentPlayerPosition.x, y: currentPlayerPosition.y - 1 };
      case 'east':
        return { x: currentPlayerPosition.x + 1, y: currentPlayerPosition.y };
      case 'south':
        return { x: currentPlayerPosition.x, y: currentPlayerPosition.y + 1 };
      case 'west':
        return { x: currentPlayerPosition.x - 1, y: currentPlayerPosition.y };
      default:
        return currentPlayerPosition;
    }
  };

  // Save its coordinates
  const nextPlayerPosition = getNextPlayerPosition(currentPlayerPosition, direction);

  // Get the potential next player object
  const getNextPlayerObj = (state, nextPlayerPosition) => {
    return state.find(
      cell =>
        cell.coordinates.x === nextPlayerPosition.x && cell.coordinates.y === nextPlayerPosition.y
    );
  };
  // Save it as a variable
  const nextPlayerObj = getNextPlayerObj(state, nextPlayerPosition);

  // Save its index
  const nextPlayerIndex = state.indexOf(nextPlayerObj);

  // Check if the nextPosition is a floor
  const validateNextPosition = nextPlayerObj => {
    if (nextPlayerObj.type === 1 && !nextPlayerObj.enemy) {
      return true;
    } else {
      return false;
    }
  };

  let newState = JSON.parse(JSON.stringify(state));
  if (validateNextPosition(nextPlayerObj)) {
    newState.splice(currentPlayerIndex, 1, Object.assign({}, currentPlayerObj, { player: false }));
    newState.splice(
      nextPlayerIndex,
      1,
      Object.assign({}, nextPlayerObj, { player: { direction: direction } })
    );
  }
  return newState;
};
