import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as a from '../actions/';
import * as c from '../constants/settings';
import * as h from '../actions/index.helpers';
import PropTypes from 'prop-types';

import CellContainer from './CellContainer';
import Map from '../components/Map';
import Messages from '../components/Messages';
import PlayerPanel from '../components/PlayerPanel';
import Start from '../components/Start';

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getTargetObj = this.getTargetObj.bind(this);
    this.listenFunc = this.listenFunc.bind(this);
    this.placeholderFunc = this.placeholderFunc.bind(this);
  }
  placeholderFunc(e) {
    e.preventDefault();
  }
  listenFunc(e) {
    // This disables player_input keys for `ANIMATION_DURATION`
    // between keydowns so animations don't stack weirdly
    this.handleKeyPress(e);
    window.removeEventListener('keydown', this.listenFunc);

    setTimeout(() => {
      this.props.clear_animation();
      window.addEventListener('keydown', this.listenFunc);
    }, c.ANIMATION_DURATION);
  }
  handleKeyPress(e) {
    const { change_weapon } = this.props;
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
        return change_weapon();
      default:
        return;
    }
  }
  setDispatch(direction) {
    const { player_input } = this.props;
    player_input(this.getTargetObj(direction));
  }
  getTargetObj(direction) {
    const { gridData, playerPosition } = this.props;
    const targetPosition = h.getTargetPosition(playerPosition, direction);
    const targetObj = gridData[targetPosition.index];
    return targetObj;
  }
  componentDidMount() {
    // Initialize (Only for testing)
    this.props.next_level();

    // Listen for player input
    window.addEventListener('keydown', this.listenFunc);

    // If the player is holding down a key while listenFunc is disabled,
    // don't start performing default operations like moving the window
    window.addEventListener('keydown', this.placeholderFunc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenFunc);
    window.removeEventListener('keydown', this.placeholderFunc);
  }
  render() {
    const { gridData, messages, player } = this.props;

    // Create an array of Cells containing data from the store
    const cells = gridData
      // .filter(
      //   (item, index) =>
      //     index === playerPosition.index ||
      //     index === playerPosition.index + 1 ||
      //     index === playerPosition.index - 1 ||
      //     index === playerPosition.index + 2 ||
      //     index === playerPosition.index - 2 ||
      //     index === playerPosition.index + c.GRID_WIDTH ||
      //     index === playerPosition.index - c.GRID_WIDTH ||
      //     index === playerPosition.index + c.GRID_WIDTH + 1 ||
      //     index === playerPosition.index - c.GRID_WIDTH + 1
      // )
      .map((item, index) => {
        const position = {
          coordinates: item.coordinates,
          index: item.index,
        };
        return (
          <CellContainer key={index} position={position} payload={item.payload} type={item.type} />
        );
      });

    const game = (
      <div>
        <PlayerPanel stats={player} />
        <Messages messages={messages} />
        <Map cells={cells} />
      </div>
    );

    return this.props.gridData.length ? (
      game
    ) : (
      <Start
        fn={() => {
          this.props.next_level();
          // setInterval(() => this.checkAttack(this.props.playerPosition), 1000);
        }}
      />
    );
  }
}

Game.propTypes = {
  change_weapon: PropTypes.func.isRequired,
  clear_animation: PropTypes.func.isRequired,
  gridData: PropTypes.arrayOf(PropTypes.object).isRequired,
  hostile_enemies: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  next_level: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playerPosition: PropTypes.object.isRequired,
  player_input: PropTypes.func.isRequired,
};

const mapStateToProps = ({ grid, player, messages }) => ({
  gridData: grid.data,
  messages,
  playerPosition: grid.playerPosition,
  player,
});

const mapDispatchToProps = dispatch => ({
  change_weapon: () => dispatch(a.change_weapon()),
  clear_animation: () => dispatch(a.clear_animation()),
  clear_enemy_animation: () => dispatch(a.clear_enemy_animation()),
  hostile_enemies: targetObj => dispatch(a.hostile_enemies(targetObj)),
  next_level: () => dispatch(a.next_level()),
  player_input: targetObj => dispatch(a.player_input(targetObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
