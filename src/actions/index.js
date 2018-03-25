// Action creators are functions that instantiate actions. They may be given
// arguments that are important to the way the state needs to change. Actions
// themselves can have multiple properties.

// Increment
export const increment = () => {
  const action = {
    type: 'INCREMENT'
  };
  return action;
};

// Decrement
export const decrement = () => {
  const action = {
    type: 'DECREMENT'
  };
  return action;
};

// toggleCell
export const toggleCell = index => {
  const TOGGLE_CELL = 'TOGGLE_CELL';
  const action = {
    type: TOGGLE_CELL,
    index
  };
  return action;
};
