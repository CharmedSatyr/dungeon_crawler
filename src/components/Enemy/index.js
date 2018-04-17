import React from 'react';
import * as c from '../../constants/settings';

// Enemy Sprite URL:
// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?body=orc&=eyes_brown&eyes=yellow&legs=pants_red&clothes=none&mail=chain&armor=chest_leather&jacket=none&hair=none&arms=plate&shoulders=leather&spikes=gold&bracers=leather&greaves=none&shoes=boots_metal&hat=none&belt=leather&weapon=spear
import sprite from './orc-sprite.png';

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

const Enemy = ({ coordinates, direction }) => (
  <div
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: `-10px ${c.SPRITE_SIZE * faceDirection(direction) - 6}px`,
      height: c.SPRITE_SIZE,
      left:
        (document.documentElement.clientWidth - c.CELL_SIDE * c.GRID_WIDTH) / 2 +
        c.CELL_SIDE * coordinates.x +
        5,
      overflow: 'hidden',
      position: 'absolute',
      transform: 'scale(0.9,0.9)',
      top: 195 + c.CELL_SIDE * coordinates.y,
      width: c.SPRITE_SIZE
    }}
  />
);

export default Enemy;
