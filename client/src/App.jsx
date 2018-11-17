import React, { Component } from "react";
import { connect } from "redux-zero/react";

import Team from "./views/Team";
import RunnerSelect from "./components/RunnerSelect";

class App extends Component {
  render() {
    const { loading, errorMessage, runnerSelectOpen } = this.props;

    return (
      <div className="App">
        {loading ? <span>Loading…</span> : ""}
        {errorMessage ? <span>{errorMessage}</span> : ""}
        {runnerSelectOpen ? (
          <RunnerSelect event="5be8961a168b5db0cdc39c82" />
        ) : (
          ""
        )}
        <Team />
      </div>
    );
  }
}

const mapToProps = ({ loading, errorMessage, runnerSelectOpen }) => ({
  loading,
  errorMessage,
  runnerSelectOpen
});

export default connect(mapToProps)(App);
