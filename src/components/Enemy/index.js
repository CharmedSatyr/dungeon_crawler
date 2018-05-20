import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import spear from './enemy-spear-40x40.png';

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
    return `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`;
  }
  return `${c.SPRITE_SIZE * -5}px ${c.SPRITE_SIZE * 1}px`;
};

const Enemy = ({ facing, stats }) => (
  <div
    style={{
      backgroundImage: `url('${spear}')`,
      backgroundPosition: setBackgroundPosition(stats.health, facing),
      height: c.SPRITE_SIZE,
      marginTop: -5,
      position: 'absolute',
      transform: 'scale(1.2,1.2)', // Enemies bigger than hero
      width: c.SPRITE_SIZE,
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
