import React from 'react';
import * as c from '../../constants/settings';

// Player Sprite URL:
// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?sex=female&body=darkelf2&eyes=red&nose=straight&ears=elven&legs=sara&clothes=sleeveless_maroon&mail=none&armor=chest_leather&jacket=none&hair=ponytail2_raven&shoulders=leather&bracers=cloth&hat=bandana_red&shoes=sara&=cape_black&belt=leather&bracelet=on&cape=none&weapon=spear
import sprite from './heroine-sprite-40x40.png';

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
      overflow: 'hidden',
      width: c.SPRITE_SIZE
    }}
  />
);

export default Player;
