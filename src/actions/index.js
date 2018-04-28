import * as t from '../constants/action-types';
import * as g from '../constants/gameplay';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';

/*** ACTION CREATORS ***/
export const add_xp = amount => {
  const action = {
    type: t.ADD_XP,
    amount
  };
  return action;
};

export const attack = (targetObj, d) => {
  const action = {
    type: t.ATTACK,
    targetObj,
    damage: d
  };
  return action;
};

export const facing = targetObj => {
  const action = {
    type: t.FACING,
    targetObj
  };
  return action;
};

export const move = targetObj => {
  const action = {
    type: t.MOVE,
    targetObj
  };
  return action;
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
export const open = targetObj => {
  const action = {
    type: t.OPEN,
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

/*** THUNKS ***/
// Turn the enemy toward the player, display damage notification, inflict damage
// The `enemy` argument is the payload of a cell object; `targetPosition` is its position; `pap` is playerAdjacentPositions
export const hostile_enemies = (enemy, targetObj, pap) => {
  const batched = [];
  const d = g.damageCalc(enemy.level, enemy.weapon.min_damage, enemy.weapon.max_damage);
  batched.push(
    facing(targetObj),
    message('An enemy assails you and does ' + d + ' damage!'),
    take_damage(d)
  );
  return batchActions(batched);
};

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

// This primary thunk returns action creators as appropriate on player input
export const player_input = targetObj => {
  // Get info about the cell the player is advancing toward
  const { level } = getState().grid;
  const { type } = targetObj;
  const { enemy, loot, portal } = targetObj.payload;

  // Just move if the targetPosition is an empty floor or dead enemy
  if (
    (type === tileTypes(level, 'path') && !enemy && !loot && !portal) ||
    (enemy && enemy.health <= 0)
  ) {
    return batchActions([facing(targetObj), move(targetObj)]);
  }

  // If the targetPosition is an enemy, attack!
  if (enemy && enemy.health > 0) {
    const { weapon, level } = getState().player;

    const d = g.damageCalc(weapon.min_damage, weapon.max_damage, level);
    const a = attack(targetObj, d);
    const h = enemy.health - d;

    const addendum =
      h > 0 ? "Your hapless enemy's health drops to " + h + '.' : 'The enemy is slain!';

    let msg = 'You swing mightily and do ' + d + ' damage. ' + addendum;
    const m = message(msg);

    if (enemy.health <= 0) {
      const xp = g.xpCalc(enemy.level);
      return batchActions([a, m, facing(targetObj), add_xp(xp), level_check(xp)]);
    } else {
      return batchActions([a, m, facing(targetObj)]);
    }
  }

  // If the target is a closed portal, open the door
  if (portal && !portal.open) {
    const msg = 'The door creaks open...';
    return batchActions([open(targetObj), message(msg)]);
  }

  // If the targetObj is an open portal, go to the next level!
  if (portal && portal.open) {
    const msg = 'You fearlessly descend into darkness.';
    return batchActions([next_level(), message(msg)]);
  }

  // If no conditions are met, just face in the right direction
  return facing(targetObj);
};
