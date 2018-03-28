import React from 'react';
import './Cell.css';

const Cell = ({ player, fn, index }) => (
  <div className={player ? 'Cell player' : 'Cell'} onClick={fn}>
    {index}
    {player ? 'a' : 'd'}
  </div>
);

export default Cell;
