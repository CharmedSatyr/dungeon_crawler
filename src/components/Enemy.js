import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as c from '../constants/settings';
import * as a from '../actions/';
import * as l from '../constants/loot';
import PropTypes from 'prop-types';

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

// export const checkMove = (playerPosition, enemyPosition, gridData) => {
//   // Player is diagonal right of enemy
//   if (enemyPosition.index + c.GRID_WIDTH + 1 === playerPosition.index) {
//     // Move right
//     const targetObj = gridData[enemyPosition.index + 1];
//     return this.props.move_enemy(enemyPosition, targetObj);
//   }
// };

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.checkMove = this.checkMove.bind(this);
  }
  //  checkMove(playerPosition, enemyPosition, gridData) {
  //    // Player is right of enemy
  //    console.log('playerPosition:', playerPosition.coordinates.y);
  //    console.log('enemyPosition:', enemyPosition.coordinates.y);
  //    if (enemyPosition.coordinates.y === playerPosition.coordinates.y) {
  //      console.log('yabba dabba doo!');
  //      // Move right
  //      const targetObj = gridData[enemyPosition.index + 1];
  //      return this.props.move_enemy(enemyPosition, targetObj);
  //    }
  //  }
  render() {
    const { gridData, enemyAnimation, facing, position, playerPosition, stats } = this.props;
    // setInterval(() => this.checkMove(playerPosition, position, gridData), 1000);
    return (
      <div
        className={setAnimationClass(stats.weapon.name, enemyAnimation, facing, position.index)}
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
  }
}

Enemy.propTypes = {
  enemyAnimation: PropTypes.object.isRequired,
  facing: PropTypes.string,
  gridData: PropTypes.array.isRequired,
  move_enemy: PropTypes.func.isRequired,
  position: PropTypes.shape({
    coordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    index: PropTypes.number.isRequired,
  }),
  playerPosition: PropTypes.shape({
    coordinates: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    index: PropTypes.number.isRequired,
  }),
  stats: PropTypes.shape({
    health: PropTypes.number.isRequired,
    weapon: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = ({ animation, grid }) => ({
  enemyAnimation: animation.enemy,
  gridData: grid.data,
  playerPosition: grid.playerPosition,
});

const mapDispatchToProps = dispatch => ({
  move_enemy: (enemyPosition, targetObj) => dispatch(a.move_enemy(enemyPosition, targetObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Enemy);
