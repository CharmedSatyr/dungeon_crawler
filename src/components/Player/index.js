import React from 'react';
import * as c from '../../constants/settings';
import sprite from './heroine-sprite.png';
import './styles.css';

const Player = ({ coordinates }) => (
  <div
    className="player"
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: `0px ${c.SPRITE_SIZE * 1}px`,
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
