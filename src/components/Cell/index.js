import React from 'react';
import { CELL_SIDE } from '../../constants/settings';

import Player from '../Player';
import './Cell.css';

const Cell = ({ fn, payload }) => (
  <div
    className="Cell"
    onClick={fn}
    style={{
      background: payload.type === 'floor' ? '#e2d6be' : null,
      height: CELL_SIDE,
      width: CELL_SIDE
    }}
  >
    {payload.player ? <Player coordinates={payload.coordinates} /> : null}
    {/*payload.player ? null : (
      <span>
        {payload.coordinates.x}, {payload.coordinates.y}
      </span>
    )*/}
  </div>
);

export default Cell;
