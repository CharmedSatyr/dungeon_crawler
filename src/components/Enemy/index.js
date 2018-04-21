import React from 'react';
import * as c from '../../constants/settings';

// Enemy Sprite URL:
// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?body=orc&=eyes_brown&eyes=yellow&legs=pants_red&clothes=none&mail=chain&armor=chest_leather&jacket=none&hair=none&arms=plate&shoulders=leather&spikes=gold&bracers=leather&greaves=none&shoes=boots_metal&hat=none&belt=leather&weapon=spear
import sprite from './orc-sprite-40x40.png';

const faceDirection = direction => {
  switch (direction) {
    case 'north':
      return 0;
    case 'east':
      return 2;
    case 'south':
      return 3;
    case 'west':
      return 4;
    default:
      return '3';
  }
};

const bgp = (health, direction) => {
  if (health > 0) {
    return `0px ${c.SPRITE_SIZE * faceDirection(direction)}px`;
  }
  return `${c.SPRITE_SIZE * -5}px ${c.SPRITE_SIZE * 1}px`;
};
const Enemy = ({ coordinates, direction, stats }) => (
  <div
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: bgp(stats.health, direction),
      height: c.SPRITE_SIZE,
      marginTop: -5,
      position: 'absolute',
      transform: 'scale(1.2,1.2)', // Enemies bigger than hero
      width: c.SPRITE_SIZE
    }}
  />
);

export default Enemy;
