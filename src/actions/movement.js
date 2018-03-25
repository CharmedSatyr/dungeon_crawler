// Player movement action creators
// Used by both grid and position reducers

// move player one square to the right
export const moveEast = position => {
  const MOVE_EAST = 'MOVE_EAST';
  const action = {
    type: MOVE_EAST,
    position
  };
  return action;
};

// move player one square up
export const moveNorth = position => {
  const MOVE_NORTH = 'MOVE_NORTH';
  const action = {
    type: MOVE_NORTH,
    position
  };
  return action;
};

// move player one square down
export const moveSouth = position => {
  const MOVE_SOUTH = 'MOVE_SOUTH';
  const action = {
    type: MOVE_SOUTH,
    position
  };
  return action;
};

// move player one square to the left
export const moveWest = position => {
  const MOVE_WEST = 'MOVE_WEST';
  const action = {
    type: MOVE_WEST,
    position
  };
  return action;
};
