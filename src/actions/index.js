import * as t from '../constants/action-types';
import * as g from '../constants/gameplay';
import * as l from '../constants/loot';
import tileTypes from '../constants/tile-types';
import { getState } from '../store';
import { batchActions } from 'redux-batched-actions';

/*** ACTION CREATORS ***/
export const add_gold = (amount, targetObj) => {
  const action = {
    type: t.ADD_GOLD,
    amount,
    targetObj,
  };
  return action;
};

export const add_item = (item, targetObj) => {
  const action = {
    type: t.ADD_ITEM,
    item,
    targetObj,
  };
  return action;
};

export const add_xp = amount => {
  const action = {
    type: t.ADD_XP,
    amount,
  };
  return action;
};

export const attack = (targetObj, d) => {
  const action = {
    type: t.ATTACK,
    targetObj,
    damage: d,
  };
  return action;
};

export const change_weapon = () => {
  const action = {
    type: t.CHANGE_WEAPON,
  };
  return action;
};

export const clear_animation = () => {
  const action = {
    type: t.CLEAR_ANIMATION,
  };
  return action;
};

export const clear_enemy_animation = targetObj => {
  const action = {
    targetObj,
    type: t.CLEAR_ENEMY_ANIMATION,
  };
  return action;
};

export const drink = (targetObj, amount) => {
  const action = {
    type: t.DRINK,
    targetObj,
    amount,
  };
  return action;
};

export const facing = (targetObj, flag = 'player') => {
  const action = {
    type: t.FACING,
    targetObj,
    flag,
  };
  return action;
};

export const game_over = () => {
  const action = {
    type: t.GAME_OVER,
  };
  return action;
};

export const move = targetObj => {
  const action = {
    targetObj,
    type: t.MOVE,
  };
  return action;
};

export const move_enemy = (enemyPosition, targetObj) => {
  const action = {
    enemyPosition,
    targetObj,
    type: t.MOVE_ENEMY,
  };
  return action;
};

export const level_up = () => {
  const action = {
    type: t.LEVEL_UP,
  };
  return action;
};

export const message = msg => {
  const action = {
    type: t.MESSAGE,
    msg,
  };
  return action;
};

// This affects game level, not player level
export const next_level = () => {
  const action = {
    type: t.NEXT_LEVEL,
  };
  return action;
};

// Open doors
export const open = targetObj => {
  const action = {
    type: t.OPEN,
    targetObj,
  };
  return action;
};

export const take_damage = (damage, index) => {
  const action = {
    damage,
    index,
    type: t.TAKE_DAMAGE,
  };
  return action;
};

/*** THUNKS ***/
export const enemy_attack = targetObj => {
  const { enemy } = targetObj.payload;
  const { index } = targetObj;
  if (enemy) {
    const d = g.damageCalc(enemy.level, enemy.weapon.min_damage, enemy.weapon.max_damage);
    const msg = `An enemy assails you and does ${d} damage!`;
    return batchActions([facing(targetObj, 'enemy'), message(msg), take_damage(d, index)]);
  }
  return null;
};

// Check if the player should level up
export const level_check = (xp, player = getState().player) => {
  const { experience, level } = player;
  const newExp = xp + experience;
  const msg = `You feel yourself growing stronger... You have achieved level ${level + 1}.`;
  if (g.levelCheck(newExp, level)) {
    return batchActions([level_up(), message(msg)]);
  }
  return batchActions([{ type: null }]);
};

// This primary thunk returns action creators as appropriate on player input
export const player_input = (targetObj, player = getState().player) => {
  // Get info about the cell the player is advancing toward
  const { level } = getState().grid;
  const { type } = targetObj;
  const { enemy, loot, portal, prince } = targetObj.payload;

  // Just move if the targetPosition is an empty floor or dead enemy
  if (
    (type === tileTypes(level, 'path') && !enemy && !loot && !portal && !prince) ||
    (enemy && enemy.health <= 0)
  ) {
    return move(targetObj);
  }

  // If the targetPosition is an enemy, attack!
  if (enemy && enemy.health > 0) {
    const { weapon, level } = player;

    // Calculate damage and display a message
    const d = g.damageCalc(weapon.min_damage, weapon.max_damage, level);
    const h = enemy.health - d;
    const addendum = h > 0 ? `Your hapless enemy's health drops to ${h}.` : 'The enemy is slain!';
    let msg = `You engage the enemy and do ${d} damage. ${addendum}`;

    // If the enemy is dead, player gains experience
    if (h <= 0) {
      const xp = g.xpCalc(enemy.level);
      return batchActions([
        add_xp(xp),
        attack(targetObj, d),
        facing(targetObj),
        level_check(xp),
        message(msg),
      ]);
    } else {
      // Otherwise keep fighting
      return batchActions([attack(targetObj, d), message(msg), facing(targetObj)]);
    }
  }
  // If the target is a full water barrel, drink it
  if (loot && loot === l.fullBarrel) {
    const amount = g.healingCalc(level);
    const msg = 'You drink from the enchanted spring water and feel refreshed.';
    return batchActions([drink(targetObj, amount), message(msg), facing(targetObj)]);
  }

  // If the target is an empty barrel, see a message
  if (loot && loot === l.emptyBarrel) {
    const msg = 'Not a drop remains in this container...';
    return batchActions([message(msg), facing(targetObj)]);
  }

  // If the target is an item, move there, pick it up, and see a message
  if (loot && loot.item) {
    const msg = `You have picked up a ${loot.item.name}!`;
    return batchActions([move(targetObj), add_item(loot.item, targetObj), message(msg)]);
  }

  // If the target is gold, move there, pick it up, and see a message
  if (loot && loot.type === 'gold') {
    const msg = `You have picked up a ${loot.name}!`;
    return batchActions([move(targetObj), add_gold(loot.amount, targetObj), message(msg)]);
  }

  // If the target is a closed portal, open the door
  if (portal && !portal.open) {
    const msg = 'The door creaks open...';
    return batchActions([open(targetObj), message(msg), facing(targetObj)]);
  }

  // If the targetObj is an open portal, go to the next level!
  if (portal && portal.open) {
    const msg = 'You fearlessly descend into darkness.';
    return batchActions([next_level(), message(msg)]);
  }

  // If the targetObj is the prince, face him, see a message, and trigger the end of the game
  if (prince) {
    const msg = 'You have rescued Prince Few!';
    return batchActions([message(msg), facing(targetObj), game_over()]);
  }

  // If no conditions are met, just face in the right direction
  return facing(targetObj);
};
