import React from 'react';
import './Cell.css';

const Cell = ({ alive, fn, index }) => (
  <div className="Cell" onClick={fn} style={{ backgroundColor: alive ? 'gold' : 'lightblue' }}>
    {index}
    {alive ? 'a' : 'd'}
  </div>
);

export default Cell;
