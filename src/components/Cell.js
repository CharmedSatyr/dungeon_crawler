import React from 'react';
import './Cell.css';

const Cell = ({ fn, payload }) => (
  <div
    className={payload.player ? 'Cell player' : 'Cell'}
    onClick={fn}
    style={{ backgroundColor: payload.type === 'floor' ? 'brown' : null }}
  >
    {payload.coordinates.x}, {payload.coordinates.y}
  </div>
);

export default Cell;
