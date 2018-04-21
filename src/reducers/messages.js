import * as t from '../constants/action-types';

const initialState = [
  "Prince Few got drunk and was kidnapped. It's your duty to save him because...\n Well, nobody else wants to. Busy, you see."
];

// Player reducers
const messages = (state = initialState, action) => {
  switch (action.type) {
    case t.ATTACK:
      const m = state;
      m.push(action.message);
      if (m.length > 3) {
        m.shift();
      }
      return m;
    default:
      return state;
  }
};

export default messages;
