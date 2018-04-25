import React from 'react';
import PropTypes from 'prop-types';
import * as g from '../constants/gameplay';

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
        <p>Experience: {stats.experience}</p>
        <p>
          Health: {stats.health.current}/{stats.health.max}
        </p>
        <p>Weapon: {stats.weapon.name}</p>
        <p>
          Damage: {g.damageCalc(stats.weapon.min_damage, stats.weapon.min_damage, stats.level)}
          -
          {g.damageCalc(stats.weapon.max_damage, stats.weapon.max_damage, stats.level)}
        </p>
        <p>Gold: {stats.gold}</p>
      </div>
    </div>
  );
};

PlayerPanel.propTypes = {
  stats: PropTypes.object.isRequired
};

export default PlayerPanel;
