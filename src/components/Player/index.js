import React, { Component } from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import './styles.css';

export default class Player extends Component {
  faceDirection(facing) {
    switch (facing) {
      case 'north':
        return -8;
      case 'west':
        return -9;
      case 'south':
        return -10;
      case 'east':
        return -11;
      default:
        return -10;
    }
  }
  render() {
    const { faceDirection } = this;
    const { animation, facing } = this.props;
    let playerClass;
    animation.length
      ? (playerClass = `sprite ${animation[animation.length - 1]}-${facing}`)
      : (playerClass = 'sprite');
    return (
      <div
        className={playerClass}
        style={{
          backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`,
          height: c.SPRITE_SIZE,
          width: c.SPRITE_SIZE
        }}
      />
    );
  }
}

Player.propTypes = {
  animation: PropTypes.arrayOf(PropTypes.string),
  facing: PropTypes.string
};
