import React from 'react';
import { CELL_SIDE } from '../constants/settings';
import './Cell.css';

const Cell = ({ fn, payload }) => (
  <div
    className={payload.player ? 'Cell player' : 'Cell'}
    onClick={fn}
    style={{
      backgroundColor: payload.type === 'floor' ? 'brown' : null,
      height: CELL_SIDE,
      width: CELL_SIDE
    }}
  >
    {payload.coordinates.x}, {payload.coordinates.y}
  </div>
);

export default Cell;
