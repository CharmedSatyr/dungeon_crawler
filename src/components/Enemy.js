import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as c from '../constants/settings';
import * as a from '../actions/';
import * as l from '../constants/loot';
import tileTypes from '../constants/tile-types';
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

export const conditions = (targetObj, health, level) => {
  if (
    health > 0 &&
    !targetObj.payload.enemy &&
    !targetObj.payload.portal &&
    !targetObj.payload.loot &&
    !targetObj.payload.prince &&
    targetObj.type === tileTypes(level, 'path')
  ) {
    return true;
  } else {
    return false;
  }
};

export const checkMove = (
  playerPosition,
  enemyPosition,
  gridData,
  health,
  moveEnemy,
  clearAnimation,
  gridWidth,
  level
) => {
  let targetObj;
  switch (true) {
    /*** Enemy is west of the Player ***/
    case enemyPosition.index + 2 === playerPosition.index:
    case enemyPosition.index + 3 === playerPosition.index:
      // Move east
      targetObj = gridData[enemyPosition.index + 1];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is east of the Player ***/
    case enemyPosition.index - 2 === playerPosition.index:
    case enemyPosition.index - 3 === playerPosition.index:
      // Move west
      targetObj = gridData[enemyPosition.index - 1];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is north of the Player ***/
    case enemyPosition.index + 2 * gridWidth === playerPosition.index:
    case enemyPosition.index + 3 * gridWidth === playerPosition.index:
      // Move south
      targetObj = gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is south of the Player ***/
    case enemyPosition.index - 2 * gridWidth === playerPosition.index:
    case enemyPosition.index - 3 * gridWidth === playerPosition.index:
      // Move north
      targetObj = gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is northeast of Player ***/
    case enemyPosition.index - 1 + gridWidth === playerPosition.index: // NE
    case enemyPosition.index - 1 + 2 * gridWidth === playerPosition.index: // NNE
    case enemyPosition.index - 2 + gridWidth === playerPosition.index: // ENE
      // Move west if possible, else south
      targetObj = conditions(gridData[enemyPosition.index - 1], health, level)
        ? gridData[enemyPosition.index - 1]
        : gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is northwest of Player ***/
    case enemyPosition.index + 1 + gridWidth === playerPosition.index: // NW
    case enemyPosition.index + 1 + 2 * gridWidth === playerPosition.index: // NNW
    case enemyPosition.index + 2 + gridWidth === playerPosition.index: // WNW
      // Move east if possible, else south
      targetObj = conditions(gridData[enemyPosition.index + 1], health, level)
        ? gridData[enemyPosition.index + 1]
        : gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is southeast of Player ***/
    case enemyPosition.index - 1 - gridWidth === playerPosition.index: // SE
    case enemyPosition.index - 2 - gridWidth === playerPosition.index: // ESE
    case enemyPosition.index - 1 - 2 * gridWidth === playerPosition.index: // SSE
      // Move west if possible, else north
      targetObj = conditions(gridData[enemyPosition.index - 1], health, level)
        ? gridData[enemyPosition.index - 1]
        : gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is southwest of Player ***/
    case enemyPosition.index + 1 - gridWidth === playerPosition.index: // SW
    case enemyPosition.index + 2 - gridWidth === playerPosition.index: // WSW
    case enemyPosition.index + 1 - 2 * gridWidth === playerPosition.index: // SSW
      // Move east if possible, else north
      targetObj = conditions(gridData[enemyPosition.index + 1], health, level)
        ? gridData[enemyPosition.index + 1]
        : gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, health, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        return moveEnemy(enemyPosition, targetObj);
      }
      break;
    default:
      break;
  }
};

class Enemy extends Component {
  constructor(props) {
    super(props);
    this.checkAttack = this.checkAttack.bind(this);
  }
  checkAttack(playerPosition, enemyPosition, gridData, health) {
    const { clear_enemy_animation, enemy_attack } = this.props;
    // If the enemy is alive and the player is adjacent
    if (
      health > 0 &&
      (playerPosition.index === enemyPosition.index + 1 ||
        playerPosition.index === enemyPosition.index - 1 ||
        playerPosition.index === enemyPosition.index + c.GRID_WIDTH ||
        playerPosition.index === enemyPosition.index - c.GRID_WIDTH)
    ) {
      const targetObj = gridData[enemyPosition.index];
      enemy_attack(targetObj);
      setTimeout(() => clear_enemy_animation(targetObj), c.ANIMATION_DURATION);
    }
  }
  componentDidMount() {
    setInterval(() => {
      const {
        clear_enemy_animation,
        gridData,
        gridLevel,
        move_enemy,
        playerPosition,
        position,
        stats,
      } = this.props;

      if (stats.health > 0) {
        checkMove(
          playerPosition,
          position,
          gridData,
          stats.health,
          move_enemy,
          clear_enemy_animation,
          gridLevel
        );

        this.checkAttack(playerPosition, position, gridData, stats.health);
      }
      // This interval should be longer than ANIMATION_DURATION or the animations have trouble clearing
    }, 2 * c.ANIMATION_DURATION);
  }
  render() {
    const { enemyAnimation, facing, position, stats } = this.props;
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
  enemy_attack: PropTypes.func.isRequired,
  enemyAnimation: PropTypes.object.isRequired,
  facing: PropTypes.string,
  gridData: PropTypes.array.isRequired,
  gridLevel: PropTypes.number.isRequired,
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
  gridLevel: grid.level,
  playerPosition: grid.playerPosition,
});

const mapDispatchToProps = dispatch => ({
  clear_enemy_animation: targetObj => dispatch(a.clear_enemy_animation(targetObj)),
  enemy_attack: targetObj => dispatch(a.enemy_attack(targetObj)),
  move_enemy: (enemyPosition, targetObj) => dispatch(a.move_enemy(enemyPosition, targetObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Enemy);
