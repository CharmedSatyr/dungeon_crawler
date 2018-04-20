import { generate } from './grid.generate';
import { populate } from './grid.populate';
import { movement } from './grid.movement';
import { facing } from './grid.facing';
import * as t from '../constants/action-types';

const initialState = {
  data: [],
  playerPosition: {
    coordinates: { x: 0, y: 0 },
    index: 0
  }
};

// Grid reducers
const grid = (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      const updated = movement(
        state.data,
        state.playerPosition,
        action.direction,
        action.nextPlayerPosition,
        action.nextPlayerObj
      );
      return Object.assign(
        {},
        {
          data: updated.data,
          playerPosition: updated.playerPosition
        }
      );
    case t.FACING:
      return Object.assign({}, state, {
        data: facing(state.data, state.playerPosition, action.direction)
      });
    case t.NEW_LEVEL:
      // New levels should be created on an empty data array
      const level = populate(generate(initialState.data));
      return Object.assign(
        {},
        {
          data: level.data,
          playerPosition: level.playerPosition
        }
      );
    default:
      return state;
  }
};

export default grid;
