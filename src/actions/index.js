import * as t from '../constants/action-types';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';
import * as h from './index.helpers';

const attack = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};
export const take_damage = damage => {
  const action = {
    type: t.TAKE_DAMAGE,
    damage
  };
  return action;
};

const experience = amount => {
  const action = {
    type: t.ADD_XP,
    amount
  };
  return action;
};

const facing = (direction, entityPosition) => {
  const action = {
    type: t.FACING,
    direction,
    entityPosition
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

// Player takes damage if an enemy is in an adjacent cell; otherwise, do nothing
// Polling cells around player for enemies seems more efficient than polling cells around enemies for player
export const hostile_enemies = () => {
  const { data, playerPosition } = getState().grid;
  const eastEnemy = h.getTargetPosition(playerPosition, 'east');
  const southEnemy = h.getTargetPosition(playerPosition, 'south');
  const northEnemy = h.getTargetPosition(playerPosition, 'north');
  const westEnemy = h.getTargetPosition(playerPosition, 'west');

  // If there are no enemies, dispatch a `null` action, else dispatch harmless `null` with checkAttack pushes
  const batched = [{ type: null }];

  // Check for an enemy, calculate attack damage, and post a message
  const checkAttack = enemy => {
    const { index } = enemy;
    const payload = data[index].payload.enemy;

    if (payload && payload.health > 0) {
      const d = h.damageCalc(payload.level, payload.damage.min, payload.damage.max);
      const facePlayer = enemy => {
        switch (enemy) {
          case eastEnemy:
            return 'west';
          case southEnemy:
            return 'north';
          case northEnemy:
            return 'south';
          case westEnemy:
            return 'east';
          default:
            return 'south';
        }
      };

      batched.push(
        message('An enemy assails you and does ' + d + ' damage!'),
        take_damage(d),
        facing(facePlayer(enemy), enemy)
      );
    }
  };

  // Check for attack in all directions
  [eastEnemy, southEnemy, northEnemy, westEnemy].map(e => checkAttack(e));

  return batchActions(batched);
};

// Check if the player should level up
// Thunk
const level_check = xp => {
  const { experience, level } = getState().player;
  const newExp = xp + experience;
  const nextLevel = level + 1;
  const msg = 'You feel yourself growing stronger... You have achieved level ' + nextLevel + '.';
  const result = h.levelCalc(newExp, level) ? message(msg) && level_up() : { type: null };
  const announcement = h.levelCalc(newExp, level) ? message(msg) : { type: null };
  const batched = [];
  batched.push(result, announcement);
  return batchActions(batched);
};

const level_up = () => {
  const action = {
    type: t.LEVEL_UP
  };
  return action;
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
// This is re: game level, not player level
export const next_level = () => {
  const action = {
    type: t.NEXT_LEVEL
  };
  return action;
};

// This thunk returns action creators as appropriate on player move
export const move = direction => {
  // Get info about the cell the player is advancing toward
  const { data, playerPosition, level } = getState().grid;

  const targetPosition = h.getTargetPosition(playerPosition, direction);
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
    const { weapon, level } = getState().player;

    const damage = h.damageCalc(level, weapon.min_damage, weapon.max_damage);
    enemy.health -= damage;
    const addendum =
      enemy.health > 0
        ? "Your hapless enemy's health drops to " + enemy.health + '.'
        : 'The enemy is slain!';

    let msg = 'You swing mightily and do ' + damage + ' damage. ' + addendum;

    if (enemy.health <= 0) {
      // Experience gained is 10 * enemy level
      const xp = enemy.level * 10;
      return batchActions([
        attack(direction, targetPosition, targetObj),
        message(msg),
        experience(xp),
        level_check(xp)
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
  return facing(direction, playerPosition);
};
