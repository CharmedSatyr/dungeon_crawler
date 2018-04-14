import React, { Component } from 'react';
import { connect } from 'react-redux';
import { move, setCoordinates } from '../actions/movement';
import * as c from '../constants/settings';

import Cell from '../components/Cell';
import './Grid.css';

// Find the player's position
const currentPosition = gridData => {
  return gridData.find(cell => cell.player).coordinates;
};

// Establish the player's next position given current position and direction
const nextPosition = (currentPosition, direction) => {
  switch (direction) {
    case 'n':
      return { x: currentPosition.x, y: currentPosition.y - 1 };
    case 'e':
      return { x: currentPosition.x + 1, y: currentPosition.y };
    case 's':
      return { x: currentPosition.x, y: currentPosition.y + 1 };
    case 'w':
      return { x: currentPosition.x - 1, y: currentPosition.y };
    default:
      return currentPosition;
  }
};

// Make sure the nextPosition is a floor
const validateNextPosition = (gridData, nextPosition) => {
  if (
    gridData.find(
      cell => cell.coordinates.x === nextPosition.x && cell.coordinates.y === nextPosition.y
    ).type === 'floor'
  ) {
    return true;
  } else {
    return false;
  }
};

// Return the valid new position on keypress
const validMove = (direction, gridData) => {
  const current = currentPosition(gridData);
  const next = nextPosition(current, direction);

  if (validateNextPosition(gridData, next)) {
    return next;
  } else {
    return current;
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { gridData, move } = this.props;
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        e.preventDefault();
        return move(validMove('n', gridData));
      // East
      case 39:
      case 68:
        e.preventDefault();
        return move(validMove('e', gridData));
      // South
      case 40:
      case 83:
        e.preventDefault();
        return move(validMove('s', gridData));
      // West
      case 37:
      case 65:
        e.preventDefault();
        return move(validMove('w', gridData));
      case 32:
        e.preventDefault();
        console.log('spacebar');
        break;
      default:
        return;
    }
  }
  componentWillMount() {
    window.addEventListener('keydown', e => this.handleKeyPress(e));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKeyPress(e));
  }
  render() {
    const { gridData, setCoordinates } = this.props;

    const cells = gridData
      // Create an array of Cells containing data from the store
      .map((item, index) => (
        <Cell
          fn={() => setCoordinates(item.coordinates)} // Testing function
          key={index}
          payload={item}
        />
      ));

    // Render the cells array
    return (
      // Grid width must be Cell width * GRID_WIDTH for columns to line up
      <div className="Grid" style={{ width: c.CELL_SIDE * c.GRID_WIDTH }}>
        {cells}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gridData: state.grid
});

const mapDispatchToProps = dispatch => ({
  setCoordinates: c => dispatch(setCoordinates(c)),
  move: c => dispatch(move(c))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
