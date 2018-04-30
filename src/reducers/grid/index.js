import * as t from '../../constants/action-types';
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
    index: 0
  }
};

// Grid reducers
const grid = (state = initialState, { damage, direction, flag, targetObj, type }) => {
  switch (type) {
    case t.ATTACK:
      return Object.assign({}, state, {
        data: attack(state.data, targetObj, damage)
      });
    case t.DRINK:
      return Object.assign({}, state, {
        data: drink(state.data, targetObj)
      });
    case t.FACING:
      return Object.assign({}, state, {
        data: facing(state.data, state.playerPosition, targetObj, flag)
      });
    case t.MOVE:
      const updated = move(state.data, state.playerPosition, targetObj);
      return Object.assign({}, state, {
        data: updated.data,
        playerPosition: updated.playerPosition
      });
    case t.NEXT_LEVEL:
      // New levels should be created on an empty data array
      let level = populate(generate([], state.level + 1), state.level + 1);
      console.log('Entering level', state.level);
      return Object.assign({}, state, {
        data: level.data,
        level: state.level + 1,
        playerPosition: level.playerPosition
      });
    case t.OPEN:
      return Object.assign({}, state, { data: open(state.data, targetObj) });
    default:
      return state;
  }
};

export default grid;
