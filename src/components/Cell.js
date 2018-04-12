import React from 'react';
import { CELL_SIDE } from '../constants/settings';
import Player from './Player';
import './Cell.css';

const Cell = ({ fn, payload }) => (
  <div
    className="Cell"
    onClick={fn}
    style={{
      backgroundColor: payload.type === 'floor' ? 'brown' : null,
      height: CELL_SIDE,
      width: CELL_SIDE
    }}
  >
    {payload.player ? <Player /> : null}
    {payload.player ? null : (
      <span>
        {payload.coordinates.x}, {payload.coordinates.y}
      </span>
    )}
  </div>
);

export default Cell;
