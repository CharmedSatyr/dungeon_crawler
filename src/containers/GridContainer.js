import { connect } from 'react-redux';
import Grid from '../components/Grid.js';
import { moveEast, moveWest, toggleCell } from '../actions/index';

const mapStateToProps = state => ({
  gridData: state.grid,
  position: state.position
});

const mapDispatchToProps = dispatch => ({
  toggleCell: index => dispatch(toggleCell(index)),
  updatePosition: index => dispatch({ type: 'UPDATE_POSITION', index: index }),
  moveEast: position => dispatch(moveEast(position)),
  moveWest: position => dispatch(moveWest(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
