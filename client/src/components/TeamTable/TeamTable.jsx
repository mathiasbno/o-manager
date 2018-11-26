import React from "react";

import { padArray } from "../../helper/helpers";
import Runner from "../atoms/Runner/Runner";
import TeamTableHeader from "../atoms/TeamTableHeader/TeamTableHeader";

import styles from "./style.module.css";

class TeamTable extends React.Component {
  get team() {
    const { team } = this.props;
    console.log(team);

    const paddedArray = padArray(team, 10, null);

    return paddedArray.map((runner, i) => {
      if (runner == null) return <Runner key={i} />;
      return <Runner runner={runner} key={i} />;
    });
  }

  render() {
    const { colapsed } = this.props;

    const TeamTableClassname = colapsed
      ? [styles.teamTable, styles.overflowHidden].join(" ")
      : styles.teamTable;

    return (
      <div className={colapsed ? styles.colapsed : null}>
        <div className={TeamTableClassname}>
          <TeamTableHeader
            titles={["Leg", "Name", "Club", "Previous results", "actions"]}
          />
          {this.team}
        </div>
      </div>
    );
  }
}

export default TeamTable;
