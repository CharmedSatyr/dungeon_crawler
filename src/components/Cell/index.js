import React from 'react';
import * as c from '../../constants/settings';

import Enemy from '../Enemy';
import Player from '../Player';
import './styles.css';

// Tiles adapted to 40x40 from https://opengameart.org/content/rpg-tileset-32x32
import tiles from './dungeon_tileset_40x40.png';

// Set appropriate background tile based on Cell type
const styleCell = type => {
  const vines = '-120px -160px';
  switch (true) {
    case type === 0:
      return vines;
    case type >= 1:
      return '-40px -120px';
    default:
      return '-40px -80px';
  }
};

const Loot = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: `-40px 0px`,
        height: 40,
        width: 40
      }}
    />
  );
};

const Portal = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${tiles})`,
        backgroundPosition: `-80px -120px`,
        height: 40,
        width: 40
      }}
    />
  );
};

// const c = (
//   <span>
//     {payload.coordinates.x}, {payload.coordinates.y}
//   </span>
// );

const Cell = ({ fn, payload }) => (
  <div
    onClick={fn}
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
      <Player coordinates={payload.coordinates} direction={payload.player.direction} />
    ) : null}
  </div>
);

export default Cell;
