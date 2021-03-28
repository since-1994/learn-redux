import React from "react";

const Counter = ({ increase, decrease, number }) => {
  return (
    <div>
      <button onClick={() => decrease()}>-1</button>
      <span>{number}</span>
      <button onClick={() => increase()}>+1</button>
    </div>
  );
};

export default Counter;
