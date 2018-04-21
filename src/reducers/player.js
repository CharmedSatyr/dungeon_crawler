import * as t from '../constants/action-types';

const initialState = {
  level: 1,
  health: 20,
  weapon: {
    name: 'fists',
    min_damage: 1,
    max_damage: 3
  }
};

// Player reducers
const player = (state = initialState, action) => {
  switch (action.type) {
    case t.ATTACK:
      console.log('ATTACK!');
      return state;
    default:
      return state;
  }
};

export default player;
