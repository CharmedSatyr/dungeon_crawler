import { generate } from './grid.generate';
import { populate } from './grid.populate';
import { movement } from './grid.movement';
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
const grid = (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      const updated = movement(state.data, state.playerPosition, action.direction);
      return Object.assign({}, ...state, {
        data: updated.data,
        playerPosition: updated.playerPosition
      });
    case t.NEW_LEVEL:
      // New levels should be created on an empty data array
      const level = populate(generate(initialState.data));
      return Object.assign({}, ...state, {
        data: level.data,
        playerPosition: level.playerPosition
      });
    default:
      return state;
  }
};

export default grid;
