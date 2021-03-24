import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";

const Counter = ({ number, increase, decrease }) => {
  return (
    <div>
      <button
        onClick={() => {
          decrease();
        }}
      >
        -1
      </button>
      <span>{number}</span>
      <button
        onClick={() => {
          increase();
        }}
      >
        +1
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    number: state.counter.number,
  };
};

const mapDispatchToProps = {
  increase,
  decrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
