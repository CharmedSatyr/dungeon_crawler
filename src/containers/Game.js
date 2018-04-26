import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as a from '../actions/';
import PropTypes from 'prop-types';

import Cell from '../components/Cell/';
import Map from '../components/Map';
import Messages from '../components/Messages';
import PlayerPanel from '../components/PlayerPanel';

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    const { player_input } = this.props;
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        e.preventDefault();
        return player_input('north');
      // East
      case 39:
      case 68:
        e.preventDefault();
        return player_input('east');
      // South
      case 40:
      case 83:
        e.preventDefault();
        return player_input('south');
      // West
      case 37:
      case 65:
        e.preventDefault();
        return player_input('west');
      case 32:
        e.preventDefault();
        console.log('spacebar');
        break;
      default:
        return;
    }
  }
  componentWillMount() {
    this.props.next_level();
    window.addEventListener('keydown', e => this.handleKeyPress(e));
  }
  componentDidMount() {
    setInterval(this.props.hostile_enemies, 1000);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKeyPress(e));
  }
  render() {
    const { gridData, messages, player } = this.props;

    // Create an array of Cells containing data from the store
    const cells = gridData.map((item, index) => (
      <Cell coordinates={item.coordinates} key={index} payload={item.payload} type={item.type} />
    ));

    return (
      <div>
        <PlayerPanel stats={player} />
        <Messages messages={messages} />
        <Map cells={cells} />
      </div>
    );
  }
}

Game.propTypes = {
  gridData: PropTypes.arrayOf(PropTypes.object).isRequired,
  player: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  player_input: PropTypes.func.isRequired,
  next_level: PropTypes.func.isRequired,
  hostile_enemies: PropTypes.func.isRequired
};

const mapStateToProps = ({ grid, player, messages }) => ({
  gridData: grid.data,
  player,
  messages
});

const mapDispatchToProps = dispatch => ({
  player_input: direction => dispatch(a.player_input(direction)),
  next_level: () => dispatch(a.next_level()),
  hostile_enemies: () => dispatch(a.hostile_enemies())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
