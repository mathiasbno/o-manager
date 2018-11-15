import React from "react";
import { connect } from "redux-zero/react";

import actions from "./actions";

class Team extends React.Component {
  render() {
    const { runners, loading, errorMessage, getrunners } = this.props;

    return (
      <div className="team">
        <h1>My team</h1>
        {loading ? <span>Loading…</span> : ""}
        {errorMessage ? <span>{errorMessage}</span> : ""}
        <ul>
          {runners.map(function(runner, index) {
            return <li key={index}>{runner.name.given}</li>;
          })}
        </ul>
        <div>
          <button onClick={() => getrunners("5be8961a168b5db0cdc39c82")}>
            Get runners
          </button>
        </div>
      </div>
    );
  }
}

const mapToProps = ({ runners, loading, errorMessage, getrunners }) => ({
  runners,
  loading,
  errorMessage,
  getrunners
});

export default connect(
  mapToProps,
  actions
)(Team);
