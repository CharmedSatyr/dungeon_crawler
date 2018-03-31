// Player movement action creators
// Used by both grid and position reducers
import * as t from '../constants/action-types';
import { GRID_HEIGHT, GRID_WIDTH } from '../constants/settings';

// setCoordinates
export const setCoordinates = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x,
    y: c.y
  };
  return action;
};

// move player one square to the right
export const moveEast = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x + 1 < GRID_WIDTH ? c.x + 1 : c.x,
    y: c.y
  };
  return action;
};

// move player one square up
export const moveNorth = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x,
    y: c.y - 1 >= 0 ? c.y - 1 : c.y
  };
  return action;
};

// move player one square down
export const moveSouth = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x,
    y: c.y + 1 < GRID_HEIGHT ? c.y + 1 : c.y
  };
  return action;
};

// move player one square to the left
export const moveWest = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x - 1 >= 0 ? c.x - 1 : c.x,
    y: c.y
  };
  return action;
};
