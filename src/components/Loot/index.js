import React from 'react';
import * as c from '../../constants/settings';
import * as l from '../../constants/loot';
import PropTypes from 'prop-types';

import tiles from './Loot.png';

export const emptyBarrelPosition = '0px 0px';
export const fullBarrelPosition = '-40px 0px';
export const spearPosition = '0px -40px';
export const warningSquarePosition = '0px 40px';

export const setBGPosition = variety => {
  if (variety === l.fullBarrel) {
    return fullBarrelPosition;
  }

  if (variety === l.emptyBarrel) {
    return emptyBarrelPosition;
  }

  if (variety.item && variety.item === l.weapons.spear) {
    return spearPosition;
  }

  return warningSquarePosition;
};

const Loot = ({ variety }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: setBGPosition(variety),
        height: c.CELL_SIDE,
        width: c.CELL_SIDE,
      }}
    />
  );
};

export default Loot;

Loot.propTypes = {
  variety: PropTypes.object,
};
