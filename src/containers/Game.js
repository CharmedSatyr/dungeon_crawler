import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as a from '../actions/';
import PropTypes from 'prop-types';

import Cell from '../components/Cell/';
import Map from '../components/Map';
import Messages from '../components/Messages';
import PlayerPanel from '../components/PlayerPanel';

import * as h from '../actions/index.helpers';

class Game extends Component {
  constructor(props) {
    super(props);

    // Inititalize
    this.props.next_level();
    window.addEventListener('keydown', e => {
      e.preventDefault();
      this.handleKeyPress(e);
    });

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getTargetObj = this.getTargetObj.bind(this);
  }
  handleKeyPress(e) {
    switch (e.keyCode) {
      // North
      case 38:
      case 87:
        return this.setDispatch('north');
      // East
      case 39:
      case 68:
        return this.setDispatch('east');
      // South
      case 40:
      case 83:
        return this.setDispatch('south');
      // West
      case 37:
      case 65:
        return this.setDispatch('west');
      case 32:
        console.log('spacebar');
        break;
      default:
        return;
    }
  }
  setDispatch(direction) {
    const { player_input } = this.props;
    player_input(this.getTargetObj(direction));
  }
  checkAttack(playerPosition) {
    // Check for living enemies adjacent to player
    const { gridData, hostile_enemies } = this.props;
    const pap = h.playerAdjacentPositions(playerPosition);
    // For each neighbor
    pap.forEach(targetPosition => {
      const { index } = targetPosition;
      const targetObj = gridData[index];
      const { enemy } = targetObj.payload;
      // If enemy, initiate its attack
      if (enemy && enemy.health > 0) {
        hostile_enemies(targetObj);
      }
    });
  }
  getTargetObj(direction) {
    const { gridData, playerPosition } = this.props;
    const targetPosition = h.getTargetPosition(playerPosition, direction);
    const targetObj = gridData[targetPosition.index];
    return targetObj;
  }
  componentDidMount() {
    setInterval(() => this.checkAttack(this.props.playerPosition), 1000);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', e => this.handleKeyPress(e));
  }
  render() {
    const { gridData, messages, player } = this.props;

    // Create an array of Cells containing data from the store
    const cells = gridData.map((item, index) => (
      <Cell key={index} payload={item.payload} type={item.type} />
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
  hostile_enemies: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  next_level: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playerPosition: PropTypes.object.isRequired,
  player_input: PropTypes.func.isRequired
};

const mapStateToProps = ({ grid, player, messages }) => ({
  gridData: grid.data,
  messages,
  playerPosition: grid.playerPosition,
  player
});

const mapDispatchToProps = dispatch => ({
  hostile_enemies: targetObj => dispatch(a.hostile_enemies(targetObj)),
  next_level: () => dispatch(a.next_level()),
  player_input: targetObj => dispatch(a.player_input(targetObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
