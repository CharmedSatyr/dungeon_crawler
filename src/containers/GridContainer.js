import { connect } from 'react-redux';
import Grid from '../components/Grid.js';
import { moveEast, moveSouth, moveNorth, moveWest, setCoordinates } from '../actions/movement';

const mapStateToProps = state => ({
  gridData: state.grid,
  coordinates: state.coordinates
});

const mapDispatchToProps = dispatch => ({
  setCoordinates: c => dispatch(setCoordinates(c)),
  moveEast: c => dispatch(moveEast(c)),
  moveNorth: c => dispatch(moveNorth(c)),
  moveSouth: c => dispatch(moveSouth(c)),
  moveWest: c => dispatch(moveWest(c))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
