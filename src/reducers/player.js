import * as t from '../constants/action-types';

const initialState = {
  experience: 0,
  gold: 0,
  health: 20,
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
      return Object.assign({}, state, { level: state.level + 1 });
    case t.TAKE_DAMAGE:
      return Object.assign({}, state, { health: state.health - action.damage });
    default:
      return state;
  }
};

export default player;
