// Player movement action creators
// Used by both grid and position reducers
import * as t from '../constants/action-types';

// move player one square to the right
export const moveEast = position => {
  const action = {
    type: t.MOVE_EAST,
    position
  };
  return action;
};

// move player one square up
export const moveNorth = position => {
  const action = {
    type: t.MOVE_NORTH,
    position
  };
  return action;
};

// move player one square down
export const moveSouth = position => {
  const action = {
    type: t.MOVE_SOUTH,
    position
  };
  return action;
};

// move player one square to the left
export const moveWest = position => {
  const action = {
    type: t.MOVE_WEST,
    position
  };
  return action;
};
