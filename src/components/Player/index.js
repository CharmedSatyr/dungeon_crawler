import React from 'react';
import * as c from '../../constants/settings';
import sprite from './heroine-sprite.png';

const faceDirection = direction => {
  switch (direction) {
    case 'n':
      return 0;
    case 'e':
      return 2;
    case 's':
      return 3;
    case 'w':
      return 4;
    default:
      return '3';
  }
};

const Player = ({ coordinates, direction }) => (
  <div
    className="player"
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(direction)}px`,
      height: 70,
      left:
        Math.floor(
          (document.documentElement.clientWidth - c.CELL_SIDE * c.GRID_WIDTH) / 2 +
            c.CELL_SIDE * coordinates.x
        ) - 3.5, // left is cell side * x coordinate, counting from the start of the grid not the browser window
      overflow: 'hidden',
      position: 'absolute',
      transform: 'scale(0.8,0.8)',
      top: 193 + c.CELL_SIDE * coordinates.y,
      width: 70
    }}
  />
);

export default Player;
