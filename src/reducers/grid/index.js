import * as t from '../../constants/action-types';
import add_item from './add_item';
import attack from './attack';
import drink from './drink';
import facing from './facing';
import generate from './generate';
import move from './move';
import open from './open';
import populate from './populate';

const initialState = {
  data: [],
  level: 0,
  playerPosition: {
    coordinates: { x: 0, y: 0 },
    index: 0,
  },
};

// Grid reducers
const grid = (
  state = initialState,
  { damage, direction, enemyPosition, flag, targetObj, type }
) => {
  switch (type) {
    case t.ADD_GOLD:
    case t.ADD_ITEM:
      // This function just removes the loot from the floor; the player reducer handles inventory and gold count
      return Object.assign({}, state, {
        data: add_item(state.data, targetObj),
      });
    case t.ATTACK:
      return Object.assign({}, state, {
        data: attack(state.data, targetObj, damage),
      });
    case t.DRINK:
      return Object.assign({}, state, {
        data: drink(state.data, targetObj),
      });
    case t.FACING:
      return Object.assign({}, state, {
        data: facing(state.data, state.playerPosition, targetObj, flag),
      });
    case t.MOVE:
      const updated = move(state.data, state.playerPosition, targetObj);
      return Object.assign({}, state, {
        data: updated.data,
        playerPosition: updated.position,
      });
    case t.MOVE_ENEMY:
      const updateEnemy = move(state.data, enemyPosition, targetObj);
      return Object.assign({}, state, {
        data: updateEnemy.data,
      });
    case t.NEXT_LEVEL:
      const level = populate(generate(state.level + 1), state.level + 1);
      return Object.assign({}, state, {
        data: level.data,
        level: state.level + 1,
        playerPosition: level.playerPosition,
      });
    case t.OPEN:
      return Object.assign({}, state, { data: open(state.data, targetObj) });
    default:
      return state;
  }
};

export default grid;
