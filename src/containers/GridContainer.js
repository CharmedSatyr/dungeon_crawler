import { connect } from 'react-redux';
import Grid from '../components/Grid.js';
import { toggleCell, updatePosition } from '../actions/index';
import { moveEast, moveSouth, moveNorth, moveWest } from '../actions/movement';
// import * as position from '../actions/position';

const mapStateToProps = state => ({
  gridData: state.grid,
  position: state.position
});

const mapDispatchToProps = dispatch => ({
  toggleCell: index => dispatch(toggleCell(index)),
  updatePosition: index => dispatch(updatePosition(index)),
  moveEast: position => dispatch(moveEast(position)),
  moveSouth: position => dispatch(moveSouth(position)),
  moveWest: position => dispatch(moveWest(position)),
  moveNorth: position => dispatch(moveNorth(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
