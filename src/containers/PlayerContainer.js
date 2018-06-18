import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as l from '../constants/loot';
import * as c from '../constants/settings';
import PropTypes from 'prop-types';

import fists from '../resources/Player/alt-heroine-fists.png';
import dagger from '../resources/Player/alt-heroine-dagger.png';
import spear from '../resources/Player/alt-heroine-spear.png';
import dragonSpear from '../resources/Player/alt-heroine-dragonSpear.png';

/*** GSAP FUNCTIONS ***/
import { TimelineMax, SteppedEase } from 'gsap/TweenMax';

const north = [`${c.CELL_SIDE * -8}px`, '-=0', `-=${c.CELL_SIDE}`];
const west = [`${c.CELL_SIDE * -9}px`, `-=${c.CELL_SIDE}`, '-=0'];
const south = [`${c.CELL_SIDE * -10}px`, '+=0', `+=${c.CELL_SIDE}`];
const east = [`${c.CELL_SIDE * -11}px`, `+=${c.CELL_SIDE}`, '+=0'];

const walk = (bgY, x, y) => {
  this.timerFunc();
  const tl = new TimelineMax();
  const s = document.getElementById('player');
  tl.to(s, 0, { backgroundPositionY: bgY })
    .to(s, c.ANIMATION_DURATION, {
      ease: SteppedEase.config(8),
      backgroundPositionX: `${-8 * c.CELL_SIDE}px`,
      x,
      y,
    })
    .to(s, 0, { backgroundPositionX: 0 });
};
/*** END GSAP FUNCTIONS ***/

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

class PlayerContainer extends Component {
  render() {
    const { playerAnimation, facing, weaponName } = this.props;
    return (
      <div
        id="player"
        className={setAnimationClass(weaponName, playerAnimation, facing)}
        style={{
          backgroundImage: `url(${setSpriteSheet(weaponName)})`,
          backgroundPosition: `0px ${c.CELL_SIDE * faceDirection(facing)}px`,
          height: c.CELL_SIDE,
          position: 'absolute',
          width: c.CELL_SIDE,
          zIndex: 1,
        }}
      />
    );
  }
}

PlayerContainer.propTypes = {
  facing: PropTypes.string,
  playerAnimation: PropTypes.string,
  weaponName: PropTypes.string.isRequired,
};

const mapStateToProps = ({ animation, player }) => ({
  playerAnimation: animation.player,
  weaponName: player.weapon.name,
});

export default connect(
  mapStateToProps,
  null
)(PlayerContainer);
