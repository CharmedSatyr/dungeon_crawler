import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import orcSpear from './orc-spear.png';
import boss from './boss-sprite.png';

export const faceDirection = facing => {
  switch (facing) {
    case 'north':
      return -4;
    case 'west':
      return -5;
    case 'south':
      return -6;
    case 'east':
      return -7;
    default:
      return -6;
  }
};

export const setBackgroundPosition = (health, facing) => {
  if (health > 0) {
    return `0 ${c.CELL_SIDE * faceDirection(facing)}px`;
  }
  return `${c.CELL_SIDE * -5}px ${c.CELL_SIDE}px`;
};

export const setBackgroundImage = type => {
  if (type === 'orc') {
    return orcSpear;
  }

  if (type === 'boss') {
    return boss;
  }
};

const Enemy = ({ facing, stats }) => (
  <div
    style={{
      backgroundImage: `url('${setBackgroundImage(stats.type)}')`,
      backgroundPosition: setBackgroundPosition(stats.health, facing),
      height: c.CELL_SIDE,
      marginTop: -7,
      position: 'absolute',
      transform: 'scale(1.2,1.2)', // Enemies bigger than hero
      width: c.CELL_SIDE,
    }}
  />
);

Enemy.propTypes = {
  facing: PropTypes.string,
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
  }),
};

export default Enemy;
