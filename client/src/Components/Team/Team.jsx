import React from "react";
import { connect } from "redux-zero/react";

import actions from "./actions";

class Team extends React.Component {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <div className="team">
        <h1>My team</h1>
        <span>{count}</span>
        <div>
          <button onClick={decrement}>decrement</button>
          <button onClick={increment}>increment</button>
        </div>
      </div>
    );
  }
}

const mapToProps = ({ count }) => ({ count });

export default connect(
  mapToProps,
  actions
)(Team);
