import React, { Component } from "react";
import { connect } from "redux-zero/react";

import actions from "./store/actions/index";

import Event from "./views/Event";
import RunnerSelect from "./components/RunnerSelect";

import style from "./index.module.css";

class App extends Component {
  componentDidMount() {
    const { player, getPlayer } = this.props;

    if (!player) getPlayer();
  }

  render() {
    const { loading, errorMessage, runnerSelectOpen, player } = this.props;

    return (
      <div className={style.reset}>
        {loading ? <span>Loading…</span> : null}
        {errorMessage ? <span>{errorMessage}</span> : null}
        {runnerSelectOpen ? (
          <RunnerSelect event="5be8961a168b5db0cdc39c82" />
        ) : null}
        {player ? <Event player={player} /> : null}
      </div>
    );
  }
}

const mapToProps = ({
  loading,
  errorMessage,
  runnerSelectOpen,
  player,
  getPlayer
}) => ({
  loading,
  errorMessage,
  runnerSelectOpen,
  player,
  getPlayer
});

export default connect(
  mapToProps,
  actions
)(App);
