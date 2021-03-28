import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";
import Counter from "./Counter";

const CounterContainer = (props) => {
  return <Counter {...props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
