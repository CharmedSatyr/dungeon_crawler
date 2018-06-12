import React from 'react';

import PlayerPanel from './PlayerPanel';
import Messages from './Messages';
import Map from './Map';

const Game = ({ cells, messages, player }) => (
  <div>
    <PlayerPanel stats={player} />
    <Messages messages={messages} />
    <Map cells={cells} />
  </div>
);

export default Game;
