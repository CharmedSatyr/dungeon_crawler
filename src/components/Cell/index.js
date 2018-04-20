import React from 'react';
import * as c from '../../constants/settings';

import Enemy from '../Enemy';
import Player from '../Player';
import './styles.css';

// Tiles adapted to 40x40 from https://opengameart.org/content/rpg-tileset-32x32
import tiles from './dungeon_tileset_40x40.png';

// Set appropriate background tile based on Cell type
const styleCell = type => {
  // 0: dirt path
  // 1: stone path
  // 2: vines
  // 3: rock1
  const dirtPath = '-160px -160px';
  const vines = '-120px -160px';
  const stonePath = '-40px -120px';
  const rock1 = '-160px 0px';
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

const Loot = () => {
  // const chest1 = '-40px 0px';
  // const chest2 = '0px -40px';
  const barrel = '0px 0px';

  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: barrel,
        height: 40,
        width: 40
      }}
    />
  );
};

const Portal = () => {
  // const openDoor = '-80px 120px';
  const closedDoor = '-120px -120px';
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: closedDoor,
        height: c.CELL_SIDE,
        width: c.CELL_SIDE
      }}
    />
  );
};

const Cell = ({ coordinates, payload, type }) => (
  <div
    style={{
      backgroundImage: `url(${tiles})`,
      backgroundPosition: styleCell(type),
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.5)',
      height: c.CELL_SIDE,
      width: c.CELL_SIDE
    }}
  >
    {payload.enemy ? <Enemy coordinates={coordinates} /> : null}
    {payload.loot ? <Loot /> : null}
    {payload.portal ? <Portal /> : null}
    {payload.player ? <Player coordinates={coordinates} facing={payload.player.facing} /> : null}
  </div>
);

export default Cell;
