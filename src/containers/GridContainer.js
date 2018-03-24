import { connect } from 'react-redux';
import Grid from '../components/Grid.js';
import { toggleCell } from '../actions/index';

const mapStateToProps = state => ({
  gridData: state.grid
});

const mapDispatchToProps = dispatch => ({
  toggleCell: index => dispatch(toggleCell(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
