import { connect } from 'react-redux';
import Cell from '../presentations/Cell.js';

const mapStateToProps = state => ({
  character: state.cell
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch({ type: 'toggle' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
