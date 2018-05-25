import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ backgroundImage, backgroundPosition, cellSide, children }) => (
  <div
    style={{
      backgroundImage,
      backgroundPosition,
      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.4)',
      height: cellSide,
      width: cellSide,
    }}
  >
    {children}
  </div>
);

Cell.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.string.isRequired,
  cellSide: PropTypes.number.isRequired,
  children: PropTypes.object, // Not required; most cells don't have payloads
};

export default Cell;
