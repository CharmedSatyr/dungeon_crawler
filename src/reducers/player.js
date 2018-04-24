import * as t from '../constants/action-types';

const initialState = {
  experience: 0,
  gold: 0,
  health: {
    current: 50,
    min: 0,
    max: 50
  },
  level: 1,
  weapon: {
    name: 'fists',
    min_damage: 1,
    max_damage: 3
  }
};

// Player reducers
const player = (state = initialState, action) => {
  switch (action.type) {
    case t.ADD_XP:
      return Object.assign({}, state, { experience: state.experience + action.amount });
    case t.LEVEL_UP:
      // Leveling up affects damage calculations in actions and increases max health by ~10%
      const raisedHealth = Math.ceil(state.health.max + 0.1 * state.health.max);
      return Object.assign(
        {},
        state,
        { level: state.level + 1 },
        { health: { ...state.health, max: raisedHealth } }
      );
    case t.TAKE_DAMAGE:
      // Show the remaining health unless the player is dead
      const remaining = state.health.current - action.damage;
      return Object.assign({}, state, {
        health: {
          ...state.health,
          current: remaining >= state.health.min ? remaining : state.health.min
        }
      });
    default:
      return state;
  }
};

export default player;
