import * as t from '../constants/action-types';
import _ from 'lodash';

const initialState = {
  player: ['']
};

// Animation reducers
const animation = (state = initialState, action) => {
  switch (action.type) {
    case t.ATTACK:
      const attackArr = _.clone(state.player);
      attackArr.push('attack');
      return Object.assign({}, state, { player: attackArr });
    case t.MOVE:
      const moveArr = _.clone(state.player);
      moveArr.push('move');
      return Object.assign({}, state, { player: moveArr });
    case t.CLEAR_ANIMATION:
      return Object.assign({}, state, { player: [''] });
    default:
      return state;
  }
};

export default animation;
