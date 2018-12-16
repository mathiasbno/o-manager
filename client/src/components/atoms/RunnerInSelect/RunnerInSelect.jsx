import React from "react";

import Button from "../Button/Button";
import style from "./style.module.css";

class RunnerInSelect extends React.Component {
  render() {
    const { runner, onAddRunnerToTeam } = this.props;

    return (
      <React.Fragment>
        <h3 className={style.name}>
          {runner.name.given} {runner.name.family}
        </h3>
        <span className={style.club}>{runner.club}</span>
        <ul className={style.previousResults}>
          <li>2018: 9th leg - 2nd best time</li>
          <li>2017: 8th leg - Best time</li>
        </ul>
        <div className={style.actions}>
          <Button onClick={() => onAddRunnerToTeam(runner._id)}>
            Add runner
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default RunnerInSelect;
