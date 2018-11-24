import React, { Component } from "react";
import { connect } from "redux-zero/react";

import Event from "./views/Event";
import RunnerSelect from "./components/RunnerSelect";

import style from "./index.module.css";

class App extends Component {
  render() {
    const { loading, errorMessage, runnerSelectOpen } = this.props;

    console.log(process.env);

    return (
      <div className={style.reset}>
        {loading ? <span>Loading…</span> : ""}
        {errorMessage ? <span>{errorMessage}</span> : ""}
        {runnerSelectOpen ? (
          <RunnerSelect event="5be8961a168b5db0cdc39c82" />
        ) : (
          ""
        )}
        <Event />
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
