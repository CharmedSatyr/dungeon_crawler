import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import './styles.css';

class Player extends Component {
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
    const { playerAnimation, facing } = this.props;
    let playerClass;
    playerAnimation.length
      ? (playerClass = `sprite ${playerAnimation[playerAnimation.length - 1]}-${facing}`)
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
  playerAnimation: PropTypes.arrayOf(PropTypes.string),
  facing: PropTypes.string
};

const mapStateToProps = ({ animation }) => ({
  playerAnimation: animation.player
});

export default connect(mapStateToProps, null)(Player);
