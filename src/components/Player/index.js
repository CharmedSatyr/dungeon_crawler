import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import './styles.css';

const faceDirection = facing => {
  switch (facing) {
    case 'north':
      return -8;
    case 'east':
      return -11;
    case 'south':
      return -10;
    case 'west':
      return -9;
    default:
      return -10;
  }
};

const Player = ({ animation, facing }) => (
  <div
    className={`sprite ${animation[animation.length - 1]}-${facing}`}
    style={{
      backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`,
      height: c.SPRITE_SIZE,
      width: c.SPRITE_SIZE
    }}
  />
);

Player.propTypes = {
  animation: PropTypes.arrayOf(PropTypes.string),
  facing: PropTypes.string
};

export default Player;
