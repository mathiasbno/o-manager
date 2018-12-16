import React from "react";

import Button from "../Button/Button";
import style from "./style.module.css";

class RunnerInTeam extends React.Component {
  render() {
    const {
      runner,
      playerEvent,
      eventClass,
      onOpenRunnerSelect,
      onCloseRunnerSelect
    } = this.props;

    const eventIsRelay = playerEvent.event.eventForm === "RelaySingleDay";

    return (
      <React.Fragment>
        {runner ? (
          <React.Fragment>
            {eventIsRelay ? <span className={style.number}>1</span> : null}
            <h3 className={style.name}>
              {runner.name.given} {runner.name.family}
            </h3>
            <span className={style.club}>{runner.club}</span>
            <ul className={style.previousResults}>
              <li>2018: 9th leg - 2nd best time</li>
              <li>2017: 8th leg - Best time</li>
            </ul>
            <div className={style.actions}>
              <Button onClick={() => onCloseRunnerSelect()} color="red">
                Remove runner
              </Button>
            </div>
          </React.Fragment>
        ) : null}
        {!runner ? (
          <React.Fragment>
            {eventIsRelay ? <span className={style.number}>1</span> : null}
            <h3 className={style.noRunner}>No runner selected…</h3>
            <div className={style.actions}>
              <Button
                onClick={() => onOpenRunnerSelect(playerEvent, eventClass)}
              >
                Add runner
              </Button>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default RunnerInTeam;
