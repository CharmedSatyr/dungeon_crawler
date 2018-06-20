import * as t from '../constants/action-types';
import * as g from '../constants/gameplay';
import * as l from '../constants/loot';
import _ from 'lodash';

export const initialState = {
  experience: 0,
  gold: 0,
  health: {},
  level: 1,
  weapon: l.weapons.fists,
  inventory: [l.weapons.fists],
};
initialState.health.max = g.healthCalc(initialState.level);
initialState.health.current = initialState.health.max + 1000000;

// Player reducers
const player = (state = initialState, action) => {
  switch (action.type) {
    case t.ADD_GOLD:
      return Object.assign({}, state, { gold: state.gold + action.amount });
    case t.ADD_ITEM:
      const newItem = action.item;
      const updatedInventory = _.clone(state.inventory);
      updatedInventory.push(newItem);
      return Object.assign({}, state, { inventory: updatedInventory });
    case t.ADD_XP:
      return Object.assign({}, state, { experience: state.experience + action.amount });
    case t.CHANGE_WEAPON:
      const currentWeaponIndex = state.inventory.indexOf(state.weapon);
      let nextWeapon;
      if (state.inventory[currentWeaponIndex + 1]) {
        nextWeapon = state.inventory[currentWeaponIndex + 1];
      } else {
        nextWeapon = state.inventory[0];
      }
      return Object.assign({}, state, {
        weapon: nextWeapon,
      });
    case t.DRINK:
      // Heal the player by the amount in the barrel if that won't put the player over max health
      // Otherwise, the player is back to max health
      const healthBoost = action.amount;
      return Object.assign({}, state, {
        health: {
          ...state.health,
          current:
            state.health.current + healthBoost <= state.health.max
              ? state.health.current + healthBoost
              : state.health.max,
        },
      });
    case t.GAME_OVER:
      return initialState;
    case t.LEVEL_UP:
      const raisedLevel = state.level + 1;
      const raisedHealth = g.healthCalc(raisedLevel);
      return Object.assign(
        {},
        state,
        { level: raisedLevel },
        { health: { ...state.health, max: raisedHealth } }
      );
    case t.TAKE_DAMAGE:
      // Show the remaining health unless the player is dead, then show 0
      const remaining = state.health.current - action.damage;
      return Object.assign({}, state, {
        health: {
          ...state.health,
          current: remaining >= 0 ? remaining : 0,
        },
      });
    default:
      return state;
  }
};

export default player;
