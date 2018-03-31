// Action creators are functions that instantiate actions. They may be given
// arguments that are important to the way the state needs to change. Actions
// themselves can have multiple properties.
import * as t from '../constants/action-types';

// Increment
export const increment = () => {
  const action = {
    type: t.INCREMENT
  };
  return action;
};

// Decrement
export const decrement = () => {
  const action = {
    type: t.DECREMENT
  };
  return action;
};

// updatePosition
export const updatePosition = index => {
  const action = {
    type: t.UPDATE_POSITION,
    index
  };
  return action;
};
