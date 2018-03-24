import { connect } from 'react-redux';
import { increment, decrement } from '../actions/index';

import Counter from '../components/Counter';

const mapStateToProps = state => ({
  count: state.counter
});

const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement())
});

// imported as ConnectedCounter in App
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
