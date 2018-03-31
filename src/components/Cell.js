import React from 'react';
import './Cell.css';

const Cell = ({ coordinates, explored, fn, index, nearby, player }) => (
  <div className={player ? 'Cell player' : 'Cell'} onClick={fn}>
    {coordinates.x}, {coordinates.y}
    {/* index */}
    {nearby ? 'n' : ''}
    {explored ? '!' : ''}
  </div>
);

export default Cell;
