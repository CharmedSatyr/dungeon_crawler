import React from 'react';
import * as c from '../constants/settings';
import PropTypes from 'prop-types';

const Map = ({ cells }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      height: c.CELL_SIDE * c.VIEW_HEIGHT,
      width: c.CELL_SIDE * c.VIEW_WIDTH,
    }}
  >
    {cells}
  </div>
);

Map.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
