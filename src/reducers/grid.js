import { generate } from './grid.generate';
import { populate } from './grid.populate';
import { movement } from './grid.movement';
import * as t from '../constants/action-types';

const initialState = {
  data: [],
  playerPosition: { x: 0, y: 0 }
};

// Grid reducers
const grid = (state = initialState, action) => {
  switch (action.type) {
    case t.MOVE:
      return Object.assign({}, ...state, { data: movement(state.data, action.direction) });
    case t.NEW_LEVEL:
      return Object.assign({}, ...state, { data: populate(generate(initialState.data)) });
    default:
      return state;
  }
};

export default grid;
