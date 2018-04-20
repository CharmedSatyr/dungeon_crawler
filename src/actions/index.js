// Player movement action creators
import * as t from '../constants/action-types';
import { getState } from '../store';
import { getNextPlayerPosition } from './index.helpers';

const go = (direction, nextPlayerPosition, nextPlayerObj) => {
  const action = {
    type: t.MOVE,
    direction,
    nextPlayerPosition,
    nextPlayerObj
  };
  return action;
};

const facing = direction => {
  const action = {
    type: t.FACING,
    direction
  };
  return action;
};

// A thunk
export const move = direction => {
  // Get info about the cell the player is advancing toward
  const data = getState().grid.data;
  const playerPosition = getState().grid.playerPosition;
  const nextPlayerPosition = getNextPlayerPosition(playerPosition, direction);
  const nextPlayerObj = data[nextPlayerPosition.index];

  // Just move if the nextPlayerPosition is an empty floor
  if (nextPlayerObj.type === 1 && !nextPlayerObj.enemy) {
    return go(direction, nextPlayerPosition, nextPlayerObj);
  }

  // If no conditions are met, don't do anything
  return facing(direction);
};

export const new_level = () => {
  const action = {
    type: t.NEW_LEVEL
  };
  return action;
};
