import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import tiles from './Loot.png';

const emptyBarrel = '0px 0px';
const waterBarrel = '-40px 0px';
const warningSquare = '0px 40px';

const setVariety = variety => {
  if (variety.barrel && variety.barrel.full) {
    return waterBarrel;
  } else if (variety.barrel && !variety.barrel.full) {
    return emptyBarrel;
  } else {
    return warningSquare;
  }
};

const Loot = ({ variety }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: setVariety(variety),
        height: c.CELL_SIDE,
        width: c.CELL_SIDE
      }}
    />
  );
};

export default Loot;

Loot.propTypes = {
  variety: PropTypes.object
};
