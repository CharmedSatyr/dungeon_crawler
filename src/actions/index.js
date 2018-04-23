import * as t from '../constants/action-types';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';
import { getTargetPosition } from './index.helpers';
import _ from 'lodash';

const attack = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};
export const enemy_attack = damage => {
  const action = {
    type: t.ENEMY_ATTACK,
    damage
  };
  return action;
};

const experience = amount => {
  const action = {
    type: t.ADD_EXP,
    amount
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

// Dispatch an enemy_attack if an enemy is in an adjacent cell; otherwise, do nothing
export const hostile_enemies = () => {
  const { data, playerPosition } = getState().grid;
  const indexEast = getTargetPosition(playerPosition, 'east').index;
  const indexSouth = getTargetPosition(playerPosition, 'south').index;
  const indexNorth = getTargetPosition(playerPosition, 'north').index;
  const indexWest = getTargetPosition(playerPosition, 'west').index;

  const enemyE = data[indexEast].payload.enemy;
  const enemyS = data[indexSouth].payload.enemy;
  const enemyN = data[indexNorth].payload.enemy;
  const enemyW = data[indexWest].payload.enemy;

  // If there are no enemies, a `null` action prevents errors, else checkAttack pushes here
  const batched = [{ type: null }];

  // Check for an enemy, calculate attack damage, and post a message
  const checkAttack = enemy => {
    if (enemy && enemy.health > 0) {
      const d = _.random(enemy.damage.min, enemy.damage.max);
      batched.push(message('An enemy assails you and does ' + d + ' damage!'), enemy_attack(d));
    }
  };

  // Check for attack in all directions
  [enemyE, enemyS, enemyN, enemyW].map(e => checkAttack(e));

  return batchActions(batched);
};

const message = message => {
  const action = {
    type: t.MESSAGE,
    message
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

    let msg = 'You swing mightily and do ' + damage + ' damage. ' + addendum;
    if (enemy.health <= 0) {
      return batchActions([
        attack(direction, targetPosition, targetObj),
        message(msg),
        experience(10)
      ]);
    } else {
      return batchActions([attack(direction, targetPosition, targetObj), message(msg)]);
    }
  }

  // If the target is a closed portal, open the door
  if (portal && !portal.open) {
    const msg = 'The door creaks open...';
    return batchActions([open(direction, targetPosition, targetObj), message(msg)]);
  }

  // If the targetObj is an open portal, go to the next level!
  if (portal && portal.open) {
    const msg = 'You fearlessly descend into darkness.';
    return batchActions([next_level(), message(msg)]);
  }

  // If no conditions are met, just face in the right direction
  return facing(direction);
};
