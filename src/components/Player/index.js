import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import './styles.css';
import fists from './heroine-fists-40x40.png';
import dagger from './heroine-dagger-40x40.png';
import spear from './heroine-spear-40x40.png';

export const faceDirection = facing => {
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
};

export const setSpriteSheet = weapon => {
  switch (weapon.name) {
    case 'Fists':
      return fists;
    case 'Dagger':
      return dagger;
    case 'Spear':
      return spear;
    default:
      return spear;
  }
};

class Player extends Component {
  render() {
    const { playerAnimation, facing, weapon } = this.props;
    console.log('playerAnimation:', playerAnimation);
    let playerClass;
    playerAnimation.length
      ? (playerClass = `sprite ${playerAnimation}-${facing}`)
      : (playerClass = 'sprite');
    return (
      <div
        className={playerClass}
        style={{
          backgroundImage: `url(${setSpriteSheet(weapon)})`,
          backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`,
          height: c.SPRITE_SIZE,
          width: c.SPRITE_SIZE,
        }}
      />
    );
  }
}

Player.propTypes = {
  facing: PropTypes.string,
  playerAnimation: PropTypes.string,
  weapon: PropTypes.object.isRequired,
};

const mapStateToProps = ({ animation, player }) => ({
  playerAnimation: animation.player,
  weapon: player.weapon,
});

export default connect(mapStateToProps, null)(Player);
