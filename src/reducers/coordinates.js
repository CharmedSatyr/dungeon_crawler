import * as t from '../constants/action-types';

const coordinates = (state = { x: 2, y: 7 }, action) => {
  switch (action.type) {
    case t.SET_COORDINATES:
      const c = { x: action.x, y: action.y };
      return c;
    default:
      return state;
  }
};
export default coordinates;
