// Player movement action creators
import * as t from '../constants/action-types';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { getTargetPosition } from './index.helpers';

const go = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.MOVE,
    direction,
    targetPosition,
    targetObj
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

export const next_level = () => {
  const action = {
    type: t.NEXT_LEVEL
  };
  return action;
};

const attack = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

// A thunk
export const move = direction => {
  // Get info about the cell the player is advancing toward
  const { data, playerPosition, level } = getState().grid;

  const targetPosition = getTargetPosition(playerPosition, direction);
  const targetObj = data[targetPosition.index];
  const { type } = targetObj;
  const { enemy, loot, portal } = targetObj.payload;

  // Just move if the targetPosition is an empty floor
  if (type === tileTypes(level, 'path') && !enemy && !loot && !portal) {
    return go(direction, targetPosition, targetObj);
  }

  // If the targetPosition is an enemy, attack!
  if (enemy) {
    return attack(direction, targetPosition, targetObj);
  }

  // If the targetObj is a portal, go to the next level!
  if (portal) {
    return next_level();
  }

  // If no conditions are met, just face in the right direction
  return facing(direction);
};
