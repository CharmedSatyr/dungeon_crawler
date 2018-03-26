import React from 'react';
import PropTypes from 'prop-types';

const ShowCount = props => <h1>Count: {props.count}</h1>;
const Buttons = props => (
  <div>
    <button onClick={props.onIncrement}>+</button>
    <button onClick={props.onDecrement}>-</button>
  </div>
);

const Counter = ({ onIncrement, onDecrement, count }) => (
  <div>
    <ShowCount count={count} />
    <Buttons onIncrement={onIncrement} onDecrement={onDecrement} />
  </div>
);

Counter.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

export { ShowCount, Buttons };
export default Counter;
