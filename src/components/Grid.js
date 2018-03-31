import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css';

export default class Grid extends Component {
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
        moveNorth(coordinates);
        break;
      // East
      case 39:
      case 68:
        moveEast(coordinates);
        break;
      // South
      case 40:
      case 83:
        moveSouth(coordinates);
        break;
      // West
      case 37:
      case 65:
        moveWest(coordinates);
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

    // Populate Grid with cells from store
    const cells = gridData
      .map((item, index) => (
        <Cell
          coordinates={item.coordinates}
          fn={() => {
            setCoordinates(item.coordinates); // Testing function
          }}
          key={index}
          player={item.player}
        />
      ))
      // Filter to include only certain values
      .filter(item => {
        return item;
      });

    return <div className="Grid">{cells}</div>;
  }
}
