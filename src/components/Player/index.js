import React from 'react';
import * as c from '../../constants/settings';

// Player Sprite URL:
// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?sex=female&body=darkelf2&eyes=red&nose=straight&ears=elven&legs=sara&clothes=sleeveless_maroon&mail=none&armor=chest_leather&jacket=none&hair=ponytail2_raven&shoulders=leather&bracers=cloth&hat=bandana_red&shoes=sara&=cape_black&belt=leather&bracelet=on&cape=none&weapon=spear
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
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(direction)}px`,
      height: c.SPRITE_SIZE,
      left:
        Math.floor(
          (document.documentElement.clientWidth - c.CELL_SIDE * c.GRID_WIDTH) / 2 +
            c.CELL_SIDE * coordinates.x
        ) - 3, // left is cell side * x coordinate, counting from the start of the grid not the browser window
      overflow: 'hidden',
      position: 'absolute',
      transform: 'scale(0.7,0.7)', // The player is smaller than the enemies
      top: 195 + c.CELL_SIDE * coordinates.y,
      width: c.SPRITE_SIZE
    }}
  />
);

export default Player;
