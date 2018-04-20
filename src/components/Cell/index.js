import React from 'react';
import * as c from '../../constants/settings';

import Enemy from '../Enemy';
import Player from '../Player';
import './styles.css';

// Tiles adapted to 40x40 from https://opengameart.org/content/rpg-tileset-32x32
import tiles from './dungeon_tileset_40x40.png';

// Set appropriate background tile based on Cell type
const styleCell = type => {
  const dirt = '-160px -160px';
  const vines = '-120px -160px';
  // const stoneFloor = '-40px -120px';

  switch (true) {
    case type === 0:
      return vines;
    case type >= 1:
      return dirt;
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

// const c = (
//   <span>
//     {payload.coordinates.x}, {payload.coordinates.y}
//   </span>
// );

const Cell = ({ payload }) => (
  <div
    style={{
      backgroundImage: `url(${tiles})`,
      backgroundPosition: styleCell(payload.type),
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.5)',
      height: c.CELL_SIDE,
      width: c.CELL_SIDE
    }}
  >
    {payload.enemy ? <Enemy coordinates={payload.coordinates} /> : null}
    {payload.loot ? <Loot /> : null}
    {payload.portal ? <Portal /> : null}
    {payload.player ? (
      <Player coordinates={payload.coordinates} facing={payload.player.facing} />
    ) : null}
  </div>
);

export default Cell;
