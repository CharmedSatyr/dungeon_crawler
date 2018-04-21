// Player movement action creators
import * as t from '../constants/action-types';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { getTargetPosition } from './index.helpers';
import _ from 'lodash';

const attack = (direction, targetPosition, targetObj, message) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj,
    message
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

const go = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.MOVE,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

// Open doors
const open = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.OPEN,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

// Exported because it's triggered on componentWillMount
export const next_level = () => {
  const action = {
    type: t.NEXT_LEVEL
  };
  return action;
};

// This thunk returns action creators as appropriate
export const move = direction => {
  // Get info about the cell the player is advancing toward
  const { data, playerPosition, level } = getState().grid;

  const targetPosition = getTargetPosition(playerPosition, direction);
  const targetObj = data[targetPosition.index];
  const { type } = targetObj;
  const { enemy, loot, portal } = targetObj.payload;

  // Just move if the targetPosition is an empty floor or dead enemy
  if (
    (type === tileTypes(level, 'path') && !enemy && !loot && !portal) ||
    (enemy && enemy.health <= 0)
  ) {
    return go(direction, targetPosition, targetObj);
  }

  // If the targetPosition is an enemy, attack!
  if (enemy && enemy.health > 0) {
    const { weapon } = getState().player;
    let damage = _.random(weapon.min_damage, weapon.max_damage);
    enemy.health -= damage;
    const addendum =
      enemy.health > 0
        ? "Your hapless enemy's health drops to " + enemy.health + '.'
        : 'The enemy is slain!';

    const message = 'You swing mightily and do ' + damage + ' damage. ' + addendum;
    return attack(direction, targetPosition, targetObj, message);
  }

  // If the target is a closed portal, open the door
  if (portal && !portal.open) {
    return open(direction, targetPosition, targetObj);
  }

  // If the targetObj is an open portal, go to the next level!
  if (portal && portal.open) {
    return next_level();
  }

  // If no conditions are met, just face in the right direction
  return facing(direction);
};
