import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as a from '../actions/movement';

import Cell from '../components/Cell/';
import Map from '../components/Map';
import PlayerPanel from '../components/PlayerPanel';

class Game extends Component {
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
    this.props.new_level();
    window.addEventListener('keydown', e => this.handleKeyPress(e));
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKeyPress(e));
  }
  render() {
    const { gridData, player } = this.props;

    // Create an array of Cells containing data from the store
    const cells = gridData.map((item, index) => <Cell key={index} payload={item} />);

    return (
      <div>
        <PlayerPanel stats={player} />
        <Map cells={cells} />
      </div>
    );
  }
}

const mapStateToProps = ({ grid, player }) => ({
  gridData: grid.data,
  playerPosition: grid.playerPosition,
  player
});

const mapDispatchToProps = dispatch => ({
  move: direction => dispatch(a.move(direction)),
  new_level: () => dispatch(a.new_level())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
