import React from 'react';
import * as c from '../constants/settings';

// Map width must be Cell width * GRID_WIDTH for columns to line up
const Map = ({ cells }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', width: c.CELL_SIDE * c.GRID_WIDTH }}>
    {cells}
  </div>
);

export default Map;
