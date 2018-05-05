import * as t from '../constants/action-types';
import _ from 'lodash';

const initialState = {
  player: ['']
};

// Animation reducers
const animation = (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      const moveArr = _.clone(state.player);
      moveArr.push('move');
      return Object.assign({}, state, { player: moveArr });
    default:
      return state;
  }
};

export default animation;
