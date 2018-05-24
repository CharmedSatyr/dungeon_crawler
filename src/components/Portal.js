import React from 'react';
import PropTypes from 'prop-types';
import * as c from '../constants/settings';
import tiles from '../resources/cell/dungeon_tileset_64x64.png';

const Portal = ({ open }) => {
  const openDoor = `${-2 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
  const closedDoor = `${-3 * c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: open ? openDoor : closedDoor,
        height: c.CELL_SIDE,
        width: c.CELL_SIDE,
      }}
    />
  );
};

Portal.propTypes = {
  open: PropTypes.bool,
};

export default Portal;
