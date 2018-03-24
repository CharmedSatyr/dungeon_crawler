const initialState = {
  character: false
};

// state refers to current state when this reducer is called
const cell = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return state === false ? true : false;
    default:
      return initialState.character;
  }
};

export default cell;
