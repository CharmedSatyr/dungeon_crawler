import React from 'react';
import PropTypes from 'prop-types';

const Player = ({ backgroundPositionY, cellSide, playerClass, spriteSheet }) => (
  <div
    className={playerClass}
    style={{
      backgroundImage: `url(${spriteSheet})`,
      backgroundPosition: `0px ${backgroundPositionY}px`,
      height: cellSide,
      position: 'absolute',
      width: cellSide,
    }}
  />
);

Player.propTypes = {
  playerClass: PropTypes.string.isRequired,
  spriteSheet: PropTypes.string.isRequired,
  backgroundPositionY: PropTypes.number.isRequired,
};

export default Player;
