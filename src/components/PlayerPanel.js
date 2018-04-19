import React from 'react';

const PlayerPanel = ({ stats }) => {
  return (
    <div style={{ backgroundColor: 'yellow' }}>
      <h3>Midarin Do'ana</h3>
      <span>Level: {stats.level}</span>
      <span>Health: {stats.health} </span>
    </div>
  );
};

export default PlayerPanel;
