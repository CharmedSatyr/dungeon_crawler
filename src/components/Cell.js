import React from 'react';
import './Cell.css';

const Cell = ({ coordinates, explored, fn, index, nearby, opacity, player }) => (
  <div className={player ? 'Cell player' : 'Cell'} onClick={fn} style={{ opacity: opacity }}>
    {coordinates.x}, {coordinates.y}
    {/* index */}
    {nearby ? 'n' : ''}
    {explored ? '!' : ''}
  </div>
);

export default Cell;
