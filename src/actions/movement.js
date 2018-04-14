// Player movement action creators
import * as t from '../constants/action-types';

// setCoordinates
export const setCoordinates = c => {
  const action = {
    type: t.SET_COORDINATES,
    x: c.x,
    y: c.y
  };
  return action;
};

export const move = nextPosition => {
  const action = {
    type: t.SET_COORDINATES,
    x: nextPosition.x,
    y: nextPosition.y
  };
  return action;
};
