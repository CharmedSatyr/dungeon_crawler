import React from 'react';

const Counter = ({ onIncrement, onDecrement, count }) => {
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default Counter;
