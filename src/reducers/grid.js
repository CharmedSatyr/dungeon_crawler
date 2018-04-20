import { generate } from './grid.generate';
import { populate } from './grid.populate';
import { movement } from './grid.movement';
import { facing } from './grid.facing';
import * as t from '../constants/action-types';

const initialState = {
  data: [],
  level: 1,
  playerPosition: {
    coordinates: { x: 0, y: 0 },
    index: 0
  }
};

// Grid reducers
const grid = (state = initialState, { type, direction, nextPlayerPosition, nextPlayerObj }) => {
  switch (type) {
    case t.MOVE:
      const updated = movement(
        state.data,
        state.playerPosition,
        direction,
        nextPlayerPosition,
        nextPlayerObj
      );
      return Object.assign({}, state, {
        data: updated.data,
        playerPosition: updated.playerPosition
      });
    case t.FACING:
      return Object.assign({}, state, {
        data: facing(state.data, state.playerPosition, direction)
      });
    case t.NEXT_LEVEL:
      // New levels should be created on an empty data array
      const level = populate(generate([]));
      console.log('Entering level', state.level);
      return Object.assign({}, state, {
        data: level.data,
        level: state.level + 1,
        playerPosition: level.playerPosition
      });
    default:
      return state;
  }
};

export default grid;
