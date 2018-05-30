import React from 'react';
import { connect } from 'react-redux';
import * as c from '../constants/settings';
import PropTypes from 'prop-types';
import * as l from '../constants/loot';

import orcSpear from '../resources/enemy/orc-spear.png';
import boss from '../resources/enemy/boss-sprite.png';

export const faceDirection = facing => {
  switch (facing) {
    case 'north':
      return -4;
    case 'west':
      return -5;
    case 'south':
      return -6;
    case 'east':
      return -7;
    default:
      return -6;
  }
};

export const setBackgroundPosition = (type, health, facing) => {
  if (health > 0) {
    return `0 ${c.CELL_SIDE * faceDirection(facing)}px`;
  }
  if (type === 'orc') {
    return `${c.CELL_SIDE * -5}px ${c.CELL_SIDE}px`;
  }
  if (type === 'boss') {
    return `${c.CELL_SIDE * -5}px ${-20 * c.CELL_SIDE}px`;
  }
  return `0 0`;
};

export const setBackgroundImage = type => {
  if (type === 'orc') {
    return orcSpear;
  }

  if (type === 'boss') {
    return boss;
  }
};

export const setAnimationClass = (weaponName, enemyAnimation, facing, index) => {
  if (enemyAnimation[index] === 'attack') {
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
  } else if (enemyAnimation[index] === 'move') {
    return `move-${facing}`;
  } else {
    return '';
  }
};

const Enemy = ({ enemyAnimation, facing, index, stats }) => (
  <div
    className={setAnimationClass(stats.weapon.name, enemyAnimation, facing, index)}
    style={{
      backgroundImage: `url('${setBackgroundImage(stats.type)}')`,
      backgroundPosition: setBackgroundPosition(stats.type, stats.health, facing),
      height: c.CELL_SIDE,
      marginTop: -7,
      position: 'absolute',
      transform: 'scale(1.2,1.2)', // Enemies bigger than hero
      width: c.CELL_SIDE,
    }}
  />
);

Enemy.propTypes = {
  enemyAnimation: PropTypes.object.isRequired,
  facing: PropTypes.string,
  index: PropTypes.number.isRequired,
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
    weapon: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = ({ animation }) => ({
  enemyAnimation: animation.enemy,
});

export default connect(mapStateToProps, null)(Enemy);
