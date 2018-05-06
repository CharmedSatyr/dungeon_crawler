import React from 'react';
import * as c from '../../constants/settings';
import PropTypes from 'prop-types';

import Enemy from '../Enemy';
import Player from '../Player';
import './styles.css';

// Tiles adapted to 40x40 from https://opengameart.org/content/rpg-tileset-32x32
import tiles from './dungeon_tileset_40x40.png';

// Set appropriate background tile based on Cell type
const cellBG = type => {
  /*** Passable ***/
  // Level 1
  const dirtPath = '-160px -160px';
  // Level 2
  const stonePath = '-40px -120px';

  /*** Impassable ***/
  // Level 1
  const vines = '-120px -160px';
  // const thick = '-80px -240px';

  // Level 2
  const rock1 = '-160px 0px';
  // const peeper1 = '-200px 0px';

  // Level 3
  const lava = '-240px -40px';

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

const Loot = ({ variety }) => {
  // const chest1 = '-40px 0px';
  // const chest2 = '0px -40px';
  const emptyBarrel = '0px 0px';
  const waterBarrel = '-120px -240px';

  const setVariety = variety => {
    if (variety.barrel.full) {
      return waterBarrel;
    } else {
      return emptyBarrel;
    }
    //    switch (variety) {
    //      case variety.barrel.full:
    //        return waterBarrel;
    //      case variety.barrel.full === false:
    //        return emptyBarrel;
    //      default:
    //        console.log(variety.barrel.full);
    //        return chest1;
    //    }
  };
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

Loot.propTypes = {
  variety: PropTypes.object
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
        width: c.CELL_SIDE
      }}
    />
  );
};

Portal.propTypes = {
  open: PropTypes.bool
};

const Cell = ({ payload, type }) => (
  <div
    style={{
      backgroundImage: `url(${tiles})`,
      backgroundPosition: cellBG(type),
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.5)',
      height: c.CELL_SIDE,
      width: c.CELL_SIDE
    }}
  >
    {payload.enemy ? <Enemy facing={payload.enemy.facing} stats={payload.enemy} /> : null}
    {payload.loot ? <Loot variety={payload.loot} /> : null}
    {payload.portal ? <Portal open={payload.portal.open} /> : null}
    {payload.player ? <Player facing={payload.player.facing} /> : null}
  </div>
);

Cell.propTypes = {
  payload: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

export default Cell;
