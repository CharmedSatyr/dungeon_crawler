import React from 'react';
import PropTypes from 'prop-types';

import * as c from '../constants/settings';

import prince from '../resources/prince/Prince-Few.png';

export const faceDirection = facing => {
  switch (facing) {
    case 'north':
      return 0;
    case 'west':
      return -1;
    case 'south':
      return -2;
    case 'east':
      return -3;
    default:
      return -2;
  }
};

export const setBackgroundPosition = (type, health, facing) => {
  if (health > 0) {
    return `0 ${c.CELL_SIDE * faceDirection(facing)}px`;
  }
  if (type === 'orc' || type === 'prince') {
    return `${c.CELL_SIDE * -5}px ${c.CELL_SIDE}px`;
  }
  if (type === 'boss') {
    return `${c.CELL_SIDE * -5}px ${-20 * c.CELL_SIDE}px`;
  }
  return `0 0`;
};

const Prince = ({ facing, index, stats }) => (
  <div
    style={{
      backgroundImage: `url('${prince}')`,
      backgroundPosition: setBackgroundPosition(stats.type, stats.health, facing),
      height: c.CELL_SIDE,
      marginTop: -7,
      position: 'absolute',
      transform: 'scale(1.2,1.2)', // Enemies bigger than hero
      width: c.CELL_SIDE,
    }}
  />
);

Prince.propTypes = {
  facing: PropTypes.string,
  index: PropTypes.number,
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
    weapon: PropTypes.object.isRequired,
  }),
};

export default Prince;
