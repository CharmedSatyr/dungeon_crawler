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
    index: index
  };
  return action;
};

// move player one square to the right
// Used by both grid and position reducers
export const moveEast = position => {
  const MOVE_EAST = 'MOVE_EAST';
  const action = {
    type: MOVE_EAST,
    position: position
  };
  return action;
};

// move player one square to the left
// Used by both grid and position reducers
export const moveWest = position => {
  const MOVE_WEST = 'MOVE_WEST';
  const action = {
    type: MOVE_WEST,
    position: position
  };
  return action;
};
