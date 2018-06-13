import React from 'react';

const GameOver = ({ win }) => (
  <div>
    <h2>GAME OVER</h2>
    <h4>
      {win
        ? 'Congratulations! You have rescued Prince Few!'
        : "You have failed your mission. Prince Few's life is surely forfeit."}
    </h4>
  </div>
);

export default GameOver;
