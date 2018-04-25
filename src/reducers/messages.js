import * as t from '../constants/action-types';

const initialState = [
  "Prince Few got drunk and was kidnapped by orcs. It's your duty to save him because... Well, nobody else wants to. Busy, you see."
];

// Player reducers
const messages = (state = initialState, { msg, type }) => {
  switch (type) {
    case t.MESSAGE:
      const m = state;
      m.push(msg);
      if (m.length > 3) {
        m.shift();
      }
      return m;
    default:
      return state;
  }
};

export default messages;
