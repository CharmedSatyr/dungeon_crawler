import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveEast, moveSouth, moveNorth, moveWest, setCoordinates } from '../actions/movement';
import * as c from '../constants/settings';

import Cell from '../components/Cell';
import './Grid.css';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { coordinates, moveEast, moveSouth, moveWest, moveNorth } = this.props;
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        e.preventDefault();
        moveNorth(coordinates);
        break;
      // East
      case 39:
      case 68:
        e.preventDefault();
        moveEast(coordinates);
        break;
      // South
      case 40:
      case 83:
        e.preventDefault();
        moveSouth(coordinates);
        break;
      // West
      case 37:
      case 65:
        e.preventDefault();
        moveWest(coordinates);
        break;
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

    // Initialize the starting cell from state
    const { coordinates, setCoordinates } = this.props;
    setCoordinates(coordinates);
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
  gridData: state.grid,
  coordinates: state.coordinates
});

const mapDispatchToProps = dispatch => ({
  setCoordinates: c => dispatch(setCoordinates(c)),
  moveEast: c => dispatch(moveEast(c)),
  moveNorth: c => dispatch(moveNorth(c)),
  moveSouth: c => dispatch(moveSouth(c)),
  moveWest: c => dispatch(moveWest(c))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
