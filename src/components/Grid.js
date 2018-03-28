import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { moveEast, moveSouth, moveWest, moveNorth, position } = this.props;
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        moveNorth(position);
        break;
      // East
      case 39:
      case 68:
        moveEast(position);
        break;
      // South
      case 40:
      case 83:
        moveSouth(position);
        break;
      // West
      case 37:
      case 65:
        moveWest(position);
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
    const { gridData, toggleCell, updatePosition } = this.props;

    // Populate Grid with cells from store
    const cells = gridData.map((item, index) => {
      return (
        <Cell
          key={index}
          player={item.player}
          index={index}
          fn={() => {
            toggleCell(index);
            updatePosition(index);
          }}
        />
      );
    });

    return <div className="Grid">{cells}</div>;
  }
}
