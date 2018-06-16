import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as c from '../constants/settings';
import * as a from '../actions/';
import * as l from '../constants/loot';
import tileTypes from '../constants/tile-types';
import PropTypes from 'prop-types';

import orcFists from '../resources/enemy/orc-fists.png';
import orcDagger from '../resources/enemy/orc-dagger.png';
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

export const setBackgroundImage = (type, weaponName) => {
  if (type === 'orc') {
    switch (weaponName) {
      case l.weapons.fists.name:
        return orcFists;
      case l.weapons.dagger.name:
        return orcDagger;
      case l.weapons.spear.name:
        return orcSpear;
      default:
        return orcFists;
    }
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

export const conditions = (targetObj, level) => {
  if (
    targetObj &&
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
  moveEnemy,
  clearAnimation,
  level,
  gridWidth = c.GRID_WIDTH
) => {
  let targetObj;
  switch (true) {
    /*** Enemy is west of the Player ***/
    case enemyPosition.index + 2 === playerPosition.index:
    case enemyPosition.index + 3 === playerPosition.index:
      // Move east
      targetObj = gridData[enemyPosition.index + 1];
      if (conditions(targetObj, level)) {
        // The anonymous wrapper is necessary to avoid Syntax Error in Chromium
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is east of the Player ***/
    case enemyPosition.index - 2 === playerPosition.index:
    case enemyPosition.index - 3 === playerPosition.index:
      // Move west
      targetObj = gridData[enemyPosition.index - 1];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is north of the Player ***/
    case enemyPosition.index + 2 * gridWidth === playerPosition.index:
    case enemyPosition.index + 3 * gridWidth === playerPosition.index:
      // Move south
      targetObj = gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is south of the Player ***/
    case enemyPosition.index - 2 * gridWidth === playerPosition.index:
    case enemyPosition.index - 3 * gridWidth === playerPosition.index:
      // Move north
      targetObj = gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is northeast of Player ***/
    case enemyPosition.index - 1 + gridWidth === playerPosition.index: // NE
    case enemyPosition.index - 1 + 2 * gridWidth === playerPosition.index: // NNE
    case enemyPosition.index - 2 + gridWidth === playerPosition.index: // ENE
      // Move west if possible, else south
      targetObj = conditions(gridData[enemyPosition.index - 1], level)
        ? gridData[enemyPosition.index - 1]
        : gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is northwest of Player ***/
    case enemyPosition.index + 1 + gridWidth === playerPosition.index: // NW
    case enemyPosition.index + 1 + 2 * gridWidth === playerPosition.index: // NNW
    case enemyPosition.index + 2 + gridWidth === playerPosition.index: // WNW
      // Move east if possible, else south
      targetObj = conditions(gridData[enemyPosition.index + 1], level)
        ? gridData[enemyPosition.index + 1]
        : gridData[enemyPosition.index + gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is southeast of Player ***/
    case enemyPosition.index - 1 - gridWidth === playerPosition.index: // SE
    case enemyPosition.index - 2 - gridWidth === playerPosition.index: // ESE
    case enemyPosition.index - 1 - 2 * gridWidth === playerPosition.index: // SSE
      // Move west if possible, else north
      targetObj = conditions(gridData[enemyPosition.index - 1], level)
        ? gridData[enemyPosition.index - 1]
        : gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    /*** Enemy is southwest of Player ***/
    case enemyPosition.index + 1 - gridWidth === playerPosition.index: // SW
    case enemyPosition.index + 2 - gridWidth === playerPosition.index: // WSW
    case enemyPosition.index + 1 - 2 * gridWidth === playerPosition.index: // SSW
      // Move east if possible, else north
      targetObj = conditions(gridData[enemyPosition.index + 1], level)
        ? gridData[enemyPosition.index + 1]
        : gridData[enemyPosition.index - gridWidth];
      if (conditions(targetObj, level)) {
        setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
        moveEnemy(enemyPosition, targetObj);
      }
      break;
    default:
      break;
  }
};

export const checkAttack = (
  playerPosition,
  enemyPosition,
  gridData,
  enemyAttack,
  clearAnimation,
  gridWidth = c.GRID_WIDTH
) => {
  // If the enemy exists and the player is adjacent
  if (
    playerPosition.index === enemyPosition.index + 1 ||
    playerPosition.index === enemyPosition.index - 1 ||
    playerPosition.index === enemyPosition.index + gridWidth ||
    playerPosition.index === enemyPosition.index - gridWidth
  ) {
    const targetObj = gridData[enemyPosition.index];
    enemyAttack(targetObj);
    setTimeout(() => clearAnimation(targetObj), c.ANIMATION_DURATION);
  }
};

class Enemy extends Component {
  componentDidMount() {
    setInterval(() => {
      const {
        clear_enemy_animation,
        enemy_attack,
        gridData,
        gridLevel,
        move_enemy,
        playerPosition,
        position,
        stats,
      } = this.props;

      if (stats.health > 0) {
        checkMove(playerPosition, position, gridData, move_enemy, clear_enemy_animation, gridLevel);
        checkAttack(playerPosition, position, gridData, enemy_attack, clear_enemy_animation);
      }

      // This interval should be longer than ANIMATION_DURATION or the animations have trouble clearing
    }, 2 * c.ANIMATION_DURATION);
    // Clear Interval if playerPosition is too far away from Enemy?
  }
  render() {
    const { enemyAnimation, facing, position, stats } = this.props;
    return (
      <div
        className={setAnimationClass(stats.weapon.name, enemyAnimation, facing, position.index)}
        style={{
          backgroundImage: `url('${setBackgroundImage(stats.type, stats.weapon.name)}')`,
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
