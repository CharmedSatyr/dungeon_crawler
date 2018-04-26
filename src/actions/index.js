import * as t from '../constants/action-types';
import * as h from './index.helpers';
import * as g from '../constants/gameplay';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';

export const add_xp = amount => {
  const action = {
    type: t.ADD_XP,
    amount
  };
  return action;
};

export const attack = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

export const facing = (direction, entityPosition) => {
  const action = {
    type: t.FACING,
    direction,
    entityPosition
  };
  return action;
};

export const go = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.MOVE,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

// THUNK
// Check if the player should level up
export const level_check = xp => {
  const { experience, level } = getState().player;
  const newExp = xp + experience;
  const nextLevel = level + 1;
  const msg = 'You feel yourself growing stronger... You have achieved level ' + nextLevel + '.';
  const result = g.levelCheck(newExp, level) ? level_up() : { type: null };
  const announcement = g.levelCheck(newExp, level) ? message(msg) : { type: null };
  const batched = [];
  batched.push(result, announcement);
  return batchActions(batched);
};

export const level_up = () => {
  const action = {
    type: t.LEVEL_UP
  };
  return action;
};

export const message = msg => {
  const action = {
    type: t.MESSAGE,
    msg
  };
  return action;
};

// This affects game level, not player level
export const next_level = () => {
  const action = {
    type: t.NEXT_LEVEL
  };
  return action;
};

// Open doors
export const open = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.OPEN,
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

// THUNK
// This primary thunk returns action creators as appropriate on player move
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

    const d = g.damageCalc(weapon.min_damage, weapon.max_damage, level);
    enemy.health -= d;
    const addendum =
      enemy.health > 0
        ? "Your hapless enemy's health drops to " + enemy.health + '.'
        : 'The enemy is slain!';

    let msg = 'You swing mightily and do ' + d + ' damage. ' + addendum;

    if (enemy.health <= 0) {
      const xp = g.xpCalc(enemy.level);
      return batchActions([
        attack(direction, targetPosition, targetObj),
        message(msg),
        add_xp(xp),
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

// THUNK
// Player takes damage if an enemy is in an adjacent cell; otherwise, do nothing
// Polling cells around player for enemies seems more efficient than polling cells around enemies for player
export const hostile_enemies = () => {
  // const { player } = getState();
  const { data, playerPosition } = getState().grid;
  const playerAdjacentPositions = h.playerAdjacentPositions(playerPosition);

  // If there are no enemies, dispatch a `null` action, else dispatch harmless `null` with checkAttack pushes
  const batched = [{ type: null }];

  // Check for an enemy, face it the right way, calculate damage taken, and push a message
  const checkAttack = target => {
    const { index } = target;
    const { enemy } = data[index].payload;

    if (enemy && enemy.health > 0 /*&& player.health.current > 0*/) {
      const d = g.damageCalc(enemy.level, enemy.weapon.min_damage, enemy.weapon.max_damage);
      batched.push(
        facing(h.facePlayer(target, ...playerAdjacentPositions), target),
        take_damage(d),
        message('An enemy assails you and does ' + d + ' damage!')
      );
    }
  };

  // Check for attack in all directions
  playerAdjacentPositions.map(e => checkAttack(e));

  return batchActions(batched);
};
