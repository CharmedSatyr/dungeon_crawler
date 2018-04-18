import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as a from '../actions/movement';
import * as c from '../constants/settings';

import Cell from '../components/Cell/';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { move } = this.props;
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        e.preventDefault();
        return move('north');
      // East
      case 39:
      case 68:
        e.preventDefault();
        return move('east');
      // South
      case 40:
      case 83:
        e.preventDefault();
        return move('south');
      // West
      case 37:
      case 65:
        e.preventDefault();
        return move('west');
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
    const { gridData } = this.props;

    const cells = gridData
      // Create an array of Cells containing data from the store
      .map((item, index) => <Cell key={index} payload={item} />);

    // Render the cells array
    return (
      // Grid width must be Cell width * GRID_WIDTH for columns to line up
      <div
        className="Grid"
        style={{ display: 'flex', flexWrap: 'wrap', width: c.CELL_SIDE * c.GRID_WIDTH }}
      >
        {cells}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gridData: state.grid
});

const mapDispatchToProps = dispatch => ({
  move: direction => dispatch(a.move(direction))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
