const initialState = {
  count: 20
};

// state refers to current state when this reducer is called
const counter = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return initialState.count;
  }
};

export default counter;
