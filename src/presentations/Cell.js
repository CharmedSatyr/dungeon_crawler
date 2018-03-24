import React from 'react';
import './Cell.css';

export default ({ alive, fn, index }) => (
  <div className="Cell" onClick={fn} style={{ backgroundColor: alive ? 'gold' : 'lightblue' }}>
    {index}
  </div>
);
