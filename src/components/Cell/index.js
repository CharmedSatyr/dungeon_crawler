import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import Enemy from '../Enemy';
import Loot from '../Loot';
import Player from '../Player';
import './styles.css';

import tiles from './dungeon_tileset_40x40.png';

/*** Passable ***/
// Level 1
export const dirtPath = '-160px -160px';
// Level 2
export const stonePath = '-40px -120px';

/*** Impassable ***/
// Level 1
export const vines = '-120px -160px';
// const thick = '-80px -240px';

// Level 2
export const rock1 = '-160px 0px';
// const peeper1 = '-200px 0px';

// Level 3
export const lava = '-240px -40px';

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
  const openDoor = '-80px -120px';
  const closedDoor = '-120px -120px';
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

  if (payload.boss) {
    return <div>BOSS</div>;
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
