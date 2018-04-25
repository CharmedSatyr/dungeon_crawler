import * as t from '../constants/action-types';
import * as h from './index.helpers';
import * as g from '../constants/gameplay';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';

const attack = (direction, targetPosition, targetObj) => {
  const action = {
    type: t.ATTACK,
    direction,
    targetPosition,
    targetObj
  };
  return action;
};

const take_damage = damage => {
  const action = {
    type: t.TAKE_DAMAGE,
    damage
  };
  return action;
};

const add_xp = amount => {
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
  const { player } = getState();
  const eastEnemy = h.getTargetPosition(playerPosition, 'east');
  const southEnemy = h.getTargetPosition(playerPosition, 'south');
  const northEnemy = h.getTargetPosition(playerPosition, 'north');
  const westEnemy = h.getTargetPosition(playerPosition, 'west');

  // If there are no enemies, dispatch a `null` action, else dispatch harmless `null` with checkAttack pushes
  const batched = [{ type: null }];

  // Check for an enemy, calculate attack damage, and post a message
  const checkAttack = e => {
    const { index } = e;
    const { enemy } = data[index].payload;

    if (enemy && enemy.health > 0 && player.health.current > 0) {
      const d = g.damageCalc(enemy.level, enemy.weapon.min_damage, enemy.weapon.max_damage);
      const facePlayer = e => {
        switch (e) {
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
        facing(facePlayer(e), e)
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
  const result = g.levelCalc(newExp, level) ? level_up() : { type: null };
  const announcement = g.levelCalc(newExp, level) ? message(msg) : { type: null };
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

const message = msg => {
  const action = {
    type: t.MESSAGE,
    msg
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
