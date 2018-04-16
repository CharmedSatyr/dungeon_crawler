import React from 'react';
import { CELL_SIDE } from '../../constants/settings';

import Enemy from '../Enemy';
import Player from '../Player';
import './styles.css';

// Set appropriate CSS classes based on Cell type
const styleCell = type => {
  switch (true) {
    case 0:
      return 'Cell vegetation';
    case type >= 1:
      return 'Cell path';
    default:
      return 'Cell vegetation';
  }
};

const Cell = ({ fn, payload }) => (
  <div
    className={styleCell(payload.type)}
    onClick={fn}
    style={{
      height: CELL_SIDE,
      width: CELL_SIDE
    }}
  >
    {payload.player ? (
      <Player coordinates={payload.coordinates} direction={payload.player.direction} />
    ) : null}
    {payload.enemy ? <Enemy /> : null}
    {payload.loot ? <span>LOOT</span> : null}
    {payload.portal ? <span>PORTAL</span> : null}
    {/*payload.player ? null : (
      <span>
        {payload.coordinates.x}, {payload.coordinates.y}
      </span>
    )*/}
  </div>
);

export default Cell;
