import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import Enemy from '../Enemy';
import Loot from '../Loot';
import Player from '../Player';
import './styles.css';

import tiles from './dungeon_tileset_64x64.png';

/*** Passable ***/
// Level 1
export const dirtPath = `${-4 * c.CELL_SIDE}px ${-4 * c.CELL_SIDE}px`;
// Level 2
export const stonePath = `${-c.CELL_SIDE}px ${-3 * c.CELL_SIDE}px`;

/*** Impassable ***/
// Level 1
export const vines = `${-3 * c.CELL_SIDE}px ${-4 * c.CELL_SIDE}px`;
// const thick = `${-2 * c.CELL_SIDE}px ${-6 * c.CELL_SIDE}px`;

// Level 2
export const rock1 = `${-4 * c.CELL_SIDE}px 0px`;
// const peeper1 =`${-5 * c.CELL_SIDE}px 0px`;

// Level 3
export const lava = `${-6 * c.CELL_SIDE}px ${-c.CELL_SIDE}px`;

// Set appropriate background tile based on Cell type
export const cellBG = type => {
  switch (type) {
    case 'dirtPath':
      return dirtPath;
    case 'stonePath':
      return stonePath;
    case 'vines':
      return vines;
    case 'rock1':
      return rock1;
    case 'lava':
      return lava;
    default:
      return vines;
  }
};

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

export const display = payload => {
  if (payload.enemy) {
    return <Enemy facing={payload.enemy.facing} stats={payload.enemy} />;
  }

  if (payload.loot) {
    return <Loot variety={payload.loot} />;
  }

  if (payload.portal) {
    return <Portal open={payload.portal.open} />;
  }

  if (payload.player) {
    return <Player facing={payload.player.facing} />;
  }

  return null;
};

const Cell = ({ payload, type }) => (
  <div
    style={{
      backgroundImage: `url(${tiles})`,
      backgroundPosition: cellBG(type),
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.4)',
      height: c.CELL_SIDE,
      width: c.CELL_SIDE,
    }}
  >
    {display(payload)}
  </div>
);

Cell.propTypes = {
  payload: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Cell;
