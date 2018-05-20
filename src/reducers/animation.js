import * as t from '../constants/action-types';

const initialState = {
  player: '',
};

// Animation reducers
const animation = (state = initialState, action) => {
  switch (action.type) {
    case t.ATTACK:
      return Object.assign({}, state, { player: 'attack' });
    case t.MOVE:
      return Object.assign({}, state, { player: 'move' });
    case t.CLEAR_ANIMATION:
      return Object.assign({}, state, { player: '' });
    default:
      return state;
  }
};

export default animation;
