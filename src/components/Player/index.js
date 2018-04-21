import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

// Player Sprite URL:
// http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#?sex=female&body=darkelf2&eyes=red&nose=straight&ears=elven&legs=sara&clothes=sleeveless_maroon&mail=none&armor=chest_leather&jacket=none&hair=ponytail2_raven&shoulders=leather&bracers=cloth&hat=bandana_red&shoes=sara&=cape_black&belt=leather&bracelet=on&cape=none&weapon=spear
import sprite from './heroine-sprite-40x40.png';

const faceDirection = facing => {
  switch (facing) {
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

const Player = ({ coordinates, facing }) => (
  <div
    style={{
      backgroundImage: `url('${sprite}')`,
      backgroundPosition: `0px ${c.SPRITE_SIZE * faceDirection(facing)}px`,
      height: c.SPRITE_SIZE,
      overflow: 'hidden',
      position: 'absolute',
      width: c.SPRITE_SIZE
    }}
  />
);

Player.propTypes = {
  coordinates: PropTypes.object.isRequired,
  facing: PropTypes.string
};

export default Player;
