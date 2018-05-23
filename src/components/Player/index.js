import React from 'react';
import { connect } from 'react-redux';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';
import * as l from '../../constants/loot';

import './styles.css';
import fists from './alt-heroine-fists.png';
import dagger from './alt-heroine-dagger.png';
import spear from './alt-heroine-spear.png';
import dragonSpear from './alt-heroine-dragonSpear.png';

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

export const setPlayerClass = (weaponName, playerAnimation, facing) => {
  if (playerAnimation === 'attack') {
    switch (weaponName) {
      case l.weapons.fists.name:
        return `sprite slash-attack-${facing}`;
      case l.weapons.dagger.name:
        return `sprite slash-attack-${facing}`;
      case l.weapons.spear.name:
        return `sprite thrust-attack-${facing}`;
      default:
        return `sprite slash-attack-${facing}`;
    }
  } else if (playerAnimation === 'move') {
    return `sprite move-${facing}`;
  } else {
    return 'sprite';
  }
};

const Player = ({ playerAnimation, facing, weaponName }) => (
  <div
    className={setPlayerClass(weaponName, playerAnimation, facing)}
    style={{
      backgroundImage: `url(${setSpriteSheet(weaponName)})`,
      backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`,
      height: c.SPRITE_SIZE,
      width: c.SPRITE_SIZE,
    }}
  />
);

Player.propTypes = {
  facing: PropTypes.string,
  playerAnimation: PropTypes.string,
  weaponName: PropTypes.string.isRequired,
};

const mapStateToProps = ({ animation, player }) => ({
  playerAnimation: animation.player,
  weaponName: player.weapon.name,
});

export default connect(mapStateToProps, null)(Player);
