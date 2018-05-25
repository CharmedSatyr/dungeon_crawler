import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ animationClass, backgroundPositionY, cellSide, spriteSheet }) => (
  <div
    className={animationClass}
    style={{
      backgroundImage: `url(${spriteSheet})`,
      backgroundPosition: `0px ${backgroundPositionY}px`,
      height: cellSide,
      position: 'absolute',
      width: cellSide,
      zIndex: 1,
    }}
  />
);

Player.propTypes = {
  animationClass: PropTypes.string.isRequired,
  spriteSheet: PropTypes.string.isRequired,
  backgroundPositionY: PropTypes.number.isRequired,
};

export default Player;
