import { generate } from './grid.generate';
import { populate } from './grid.populate';
import { movement } from './grid.movement';
import * as t from '../constants/action-types';

let gridData = [];
gridData = generate(gridData);
gridData = populate(gridData);

// Grid reducers
const grid = (state = gridData, action) => {
  switch (action.type) {
    case t.MOVE:
      return movement(state, action.direction);
    default:
      return state;
  }
};

export default grid;
