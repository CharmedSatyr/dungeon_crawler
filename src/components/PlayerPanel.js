import React from 'react';

const PlayerPanel = ({ stats }) => {
  return (
    <div
      style={{
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
      }}
    >
      <h3>Midarin Do'ana</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: -20,
          width: '100%'
        }}
      >
        <p>Level: {stats.level}</p>
        <p>Health: {stats.health} </p>
        <p>Weapon: {stats.weapon.name}</p>
        <p>Damage: {`${stats.weapon.min_damage} - ${stats.weapon.max_damage}`}</p>
      </div>
    </div>
  );
};

export default PlayerPanel;
