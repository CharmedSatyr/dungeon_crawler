import React from 'react';
import * as c from '../constants/settings';
import PropTypes from 'prop-types';

// Map width must be Cell width * GRID_WIDTH for columns to line up
// UPDATE: Map should be 9 x 14 cells like Start
const Map = ({ cells }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      height: c.CELL_SIDE * 9,
      width: c.CELL_SIDE * 14,
    }}
  >
    {cells}
  </div>
);

Map.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
