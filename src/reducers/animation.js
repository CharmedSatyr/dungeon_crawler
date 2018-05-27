import * as t from '../constants/action-types';

const initialState = {
  player: '',
  enemy: '',
};

// Animation reducers
const animation = (state = initialState, action) => {
  switch (action.type) {
    case t.ATTACK:
      return Object.assign({}, state, { player: 'attack' });
    case t.CLEAR_ANIMATION:
      return Object.assign({}, state, { player: '' });
    case t.CLEAR_ENEMY_ANIMATION:
      return Object.assign({}, state, { enemy: '' });
    case t.MOVE:
      return Object.assign({}, state, { player: 'move' });
    case t.TAKE_DAMAGE:
      console.log('testing this out...');
      return Object.assign({}, state, { enemy: 'attack' });
    default:
      return state;
  }
};

export default animation;
