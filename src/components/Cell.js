import React from 'react';
import './Cell.css';

const Cell = ({ explored, fn, index, nearby, player }) => (
  <div className={player ? 'Cell player' : 'Cell'} onClick={fn}>
    {index}
    {nearby ? 'n' : ''}
    {explored ? '!' : ''}
  </div>
);

export default Cell;
