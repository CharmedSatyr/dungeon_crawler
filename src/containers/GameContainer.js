import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as a from '../actions/';
import * as c from '../constants/settings';
import * as h from '../actions/index.helpers';
import PropTypes from 'prop-types';

import CellContainer from './CellContainer';
import Game from '../components/Game';
import Start from '../components/Start';

export const viewport = (
  grid,
  playerPosition,
  viewHeight = c.VIEW_HEIGHT,
  viewWidth = c.VIEW_WIDTH,
  gridHeight = c.GRID_HEIGHT,
  gridWidth = c.GRID_WIDTH
) => {
  const { x, y } = playerPosition.coordinates;

  // Viewport limits
  const bottom = Math.max(y + viewHeight / 2, viewHeight);
  const top = _.clamp(y - viewHeight / 2, 0, gridHeight - viewHeight);

  const left = _.clamp(x - viewWidth / 2, 0, gridWidth - viewWidth);
  const right = Math.max(x + viewWidth / 2, viewWidth);

  // Display within those limits
  return grid.filter(c => {
    const cx = c.coordinates.x;
    const cy = c.coordinates.y;
    if (cx >= left && cx < right && cy >= top && cy < bottom) {
      return c;
    }
    return undefined;
  });
};

class GameContainer extends Component {
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
    const { gridData, messages, player, playerPosition } = this.props;

    // Create an array of Cells containing data from the store
    const v = viewport(gridData, playerPosition);
    const cells = v.map((item, index) => {
      const position = {
        coordinates: item.coordinates,
        index: item.index,
      };
      return (
        <CellContainer key={index} position={position} payload={item.payload} type={item.type} />
      );
    });

    return this.props.gridData.length ? (
      <Game cells={cells} messages={messages} player={player} />
    ) : (
      <Start
        fn={() => {
          this.props.next_level();
        }}
      />
    );
  }
}

Game.propTypes = {
  change_weapon: PropTypes.func.isRequired,
  clear_animation: PropTypes.func.isRequired,
  gridData: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  next_level: () => dispatch(a.next_level()),
  player_input: targetObj => dispatch(a.player_input(targetObj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
