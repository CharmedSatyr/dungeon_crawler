import React from 'react';
import { connect } from 'react-redux';
import * as c from '../constants/settings';
import PropTypes from 'prop-types';
import * as l from '../constants/loot';

import fists from '../resources/Player/alt-heroine-fists.png';
import dagger from '../resources/Player/alt-heroine-dagger.png';
import spear from '../resources/Player/alt-heroine-spear.png';
import dragonSpear from '../resources/Player/alt-heroine-dragonSpear.png';
import Player from '../components/Player';

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

export const setSpriteSheet = weaponName => {
  switch (weaponName) {
    case l.weapons.fists.name:
      return fists;
    case l.weapons.dagger.name:
      return dagger;
    case l.weapons.spear.name:
      return spear;
    case l.weapons.dragonSpear.name:
      return dragonSpear;
    default:
      return spear;
  }
};

export const setAnimationClass = (weaponName, playerAnimation, facing) => {
  if (playerAnimation === 'attack') {
    switch (weaponName) {
      case l.weapons.fists.name:
        return `slash-attack-${facing}`;
      case l.weapons.dagger.name:
        return `slash-attack-${facing}`;
      case l.weapons.spear.name:
        return `thrust-attack-${facing}`;
      default:
        return `slash-attack-${facing}`;
    }
  } else if (playerAnimation === 'move') {
    return `move-${facing}`;
  } else {
    return '';
  }
};

const PlayerContainer = ({ playerAnimation, facing, weaponName }) => (
  <Player
    animationClass={setAnimationClass(weaponName, playerAnimation, facing)}
    spriteSheet={setSpriteSheet(weaponName)}
    backgroundPositionY={c.CELL_SIDE * faceDirection(facing)}
    cellSide={c.CELL_SIDE}
  />
);

PlayerContainer.propTypes = {
  facing: PropTypes.string,
  playerAnimation: PropTypes.string,
  weaponName: PropTypes.string.isRequired,
};

const mapStateToProps = ({ animation, player }) => ({
  playerAnimation: animation.player,
  weaponName: player.weapon.name,
});

export default connect(mapStateToProps, null)(PlayerContainer);
