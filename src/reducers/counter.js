import * as t from '../constants/action-types';

const initialState = {
  count: 20
};

// state refers to current state when this reducer is called
const counter = (state = initialState.count, action) => {
  switch (action.type) {
    case t.INCREMENT:
      return state + 1;
    case t.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default counter;
