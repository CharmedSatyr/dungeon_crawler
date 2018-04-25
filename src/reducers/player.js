import * as t from '../constants/action-types';
import * as g from '../constants/gameplay';
import * as l from '../constants/loot';

const initialState = {
  experience: 0,
  gold: 0,
  health: {},
  level: 1,
  weapon: l.weapons.fists
};
initialState.health.max = g.healthCalc(initialState.level);
initialState.health.current = initialState.health.max;

// Player reducers
const player = (state = initialState, action) => {
  switch (action.type) {
    case t.ADD_XP:
      return Object.assign({}, state, { experience: state.experience + action.amount });
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
          current: remaining >= 0 ? remaining : 0
        }
      });
    default:
      return state;
  }
};

export default player;
