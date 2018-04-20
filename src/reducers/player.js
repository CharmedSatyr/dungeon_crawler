import _ from 'lodash';
import * as t from '../constants/action-types';

const initialState = {
  level: 1,
  health: 20,
  damage: _.random(1, 20)
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
