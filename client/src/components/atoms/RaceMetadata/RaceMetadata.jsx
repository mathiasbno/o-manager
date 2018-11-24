import React from "react";

import style from "./style.module.css";

class RaceInfo extends React.Component {
  render() {
    const { name, startData, runnersInTeam, points, lockTime } = this.props;

    return (
      <React.Fragment>
        <h2 className={style.metadata}>
          <strong>{name}</strong> starting <strong>{startData}</strong>{" "}
          consisting of <strong>{runnersInTeam}</strong> runners.
        </h2>
        <h2 className={style.metadata}>
          You have <strong className={style.green}>{points}</strong> points
          remaining. Team lock in <strong>{lockTime}</strong>.
        </h2>
      </React.Fragment>
    );
  }
}

export default RaceInfo;
