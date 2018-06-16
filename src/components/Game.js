import React from 'react';

import * as c from '../constants/settings';

import PlayerPanel from './PlayerPanel';
import Messages from './Messages';
import Map from './Map';

const Game = ({ cells, messages, player }) => (
  <div
    className="game"
    style={{
      width: c.CELL_SIDE * c.VIEW_WIDTH,
    }}
  >
    <PlayerPanel stats={player} />
    <Messages messages={messages} />
    <Map cells={cells} />
  </div>
);

export default Game;
