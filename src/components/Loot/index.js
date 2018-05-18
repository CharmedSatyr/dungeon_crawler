import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import tiles from './Loot.png';

export const emptyBarrel = '0px 0px';
export const fullBarrel = '-40px 0px';
export const spear = '0px -40px';
export const warningSquare = '0px 40px';

export const setBGPosition = variety => {
  if (variety && variety.barrel && variety.barrel.full) {
    return fullBarrel;
  } else if (variety && variety.barrel && !variety.barrel.full) {
    return emptyBarrel;
  }

  if (variety && variety.item && variety.item.name === 'Spear') {
    return spear;
  }

  return warningSquare;
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
