import React from 'react';
import './Cell.css';

const Cell = ({ alive, fn, index }) => (
  <div className={alive ? 'Cell alive' : 'Cell'} onClick={fn}>
    {index}
    {alive ? 'a' : 'd'}
  </div>
);

export default Cell;
