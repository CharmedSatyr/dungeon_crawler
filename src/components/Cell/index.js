import React from 'react';
import { CELL_SIDE } from '../../constants/settings';

import Player from '../Player';
import './styles.css';

const styleCell = type => {
  switch (type) {
    case 'floor':
      return 'Cell path';
    default:
      return 'Cell vegetation';
  }
};

const Cell = ({ fn, payload }) => (
  <div
    className={styleCell(payload.type)}
    onClick={fn}
    style={{
      height: CELL_SIDE,
      width: CELL_SIDE
    }}
  >
    {payload.player ? (
      <Player coordinates={payload.coordinates} direction={payload.player.direction} />
    ) : null}
    {/*payload.player ? null : (
      <span>
        {payload.coordinates.x}, {payload.coordinates.y}
      </span>
    )*/}
  </div>
);

export default Cell;
