// Player movement action creators
import * as t from '../constants/action-types';

export const move = direction => {
  const action = {
    type: t.MOVE,
    direction
  };
  return action;
};

export const new_level = () => {
  const action = {
    type: t.NEW_LEVEL
  };
  return action;
};
