import React, { Component } from "react";
import { connect } from "redux-zero/react";

import actions from "./store/actions/index";

import Event from "./views/Event";
import RunnerSelect from "./components/RunnerSelect/RunnerSelect";

import style from "./index.module.css";

class App extends Component {
  componentDidMount() {
    const { player, getPlayer } = this.props;

    if (!player) getPlayer();
  }

  render() {
    const {
      loading,
      errorMessage,
      runnerSelect,
      player,
      onAddRunnerToTeam
    } = this.props;

    return (
      <div className={style.reset}>
        {loading ? <span>Loading…</span> : null}
        {errorMessage ? <span>{errorMessage}</span> : null}
        {runnerSelect.open ? (
          <RunnerSelect
            playerEvent={runnerSelect.event}
            onAddRunnerToTeam={onAddRunnerToTeam}
          />
        ) : null}
        {player ? <Event player={player} /> : null}
      </div>
    );
  }
}

const mapToProps = ({
  loading,
  errorMessage,
  runnerSelect,
  onAddRunnerToTeam,
  player,
  getPlayer
}) => ({
  loading,
  errorMessage,
  runnerSelect,
  onAddRunnerToTeam,
  player,
  getPlayer
});

export default connect(
  mapToProps,
  actions
)(App);
