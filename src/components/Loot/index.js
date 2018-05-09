import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import tiles from './Loot.png';

const emptyBarrel = '0px 0px';
const waterBarrel = '-40px 0px';

const setVariety = variety => {
  if (variety.barrel.full) {
    return waterBarrel;
  } else {
    return emptyBarrel;
  }
};

const Loot = props => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: setVariety(props.variety),
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
