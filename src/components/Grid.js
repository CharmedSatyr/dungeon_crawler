import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css';

export default class Grid extends Component {
  render() {
    const { gridData, toggleCell } = this.props;

    const cells = gridData.map((item, index) => {
      return (
        <Cell
          key={index}
          alive={item.alive}
          index={index}
          fn={() => {
            toggleCell(index);
          }}
        />
      );
    });

    return <div className="Grid">{cells}</div>;
  }
}
