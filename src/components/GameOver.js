import React from 'react';

import * as c from '../constants/settings';

const GameOver = ({ fn, win }) => (
  <div
    style={{
      backgroundColor: 'red',
      border: '1px solid red',
      height: c.CELL_SIDE * c.VIEW_HEIGHT,
      width: c.CELL_SIDE * c.VIEW_WIDTH,
    }}
  >
    <h2>GAME OVER</h2>
    <h4>
      {win
        ? 'Congratulations! You have rescued Prince Few!'
        : "You have failed your mission. Prince Few's life is surely forfeit."}
    </h4>
    <button onClick={fn}>Try Again</button>
  </div>
);

export default GameOver;
