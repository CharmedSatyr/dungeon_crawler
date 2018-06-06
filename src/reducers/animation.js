import * as t from '../constants/action-types';

const initialState = {
  player: '',
  enemy: {},
};

// Animation reducers
const animation = (state = initialState, action) => {
  let enemyUpdate;
  switch (action.type) {
    case t.ATTACK:
      return Object.assign({}, state, { player: 'attack' });
    case t.CLEAR_ANIMATION:
      return Object.assign({}, state, { player: '' });
    case t.CLEAR_ENEMY_ANIMATION:
      enemyUpdate = Object.assign({}, state.enemy);
      delete enemyUpdate[action.targetObj.index];
      return Object.assign({}, state, { enemy: enemyUpdate });
    case t.MOVE:
      return Object.assign({}, state, { player: 'move' });
    case t.MOVE_ENEMY:
      enemyUpdate = Object.assign({}, state.enemy);
      enemyUpdate[action.targetObj.index] = 'move';
      return Object.assign({}, state, { enemy: enemyUpdate });
    case t.TAKE_DAMAGE:
      enemyUpdate = Object.assign({}, state.enemy);
      enemyUpdate[action.index] = 'attack';
      return Object.assign({}, state, { enemy: enemyUpdate });
    default:
      return state;
  }
};

export default animation;
