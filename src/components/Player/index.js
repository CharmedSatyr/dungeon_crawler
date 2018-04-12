import React from 'react';
import * as c from '../../constants/settings';

const style = { height: c.CELL_SIDE, width: c.CELL_SIDE };
const Player = () => (
  <div className="Cell player" style={style}>
    P
  </div>
);

export default Player;
