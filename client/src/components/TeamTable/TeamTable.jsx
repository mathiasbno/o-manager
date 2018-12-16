import React from "react";

import { padArray } from "../../helper/helpers.mjs";
import RunnerInTeam from "../atoms/RunnerInTeam/RunnerInTeam";
import TableRow from "../atoms/TableRow/TableRow";
import Table from "../atoms/Table/Table";

import styles from "./style.module.css";

class TeamTable extends React.Component {
  get team() {
    const {
      team,
      playerEvent,
      eventClass,
      onOpenRunnerSelect,
      onRemoveRunnerFromTeam
    } = this.props;

    const paddedArray = padArray(team, 10, null);

    return paddedArray.map((runner, i) => {
      if (runner == null)
        return (
          <TableRow key={i}>
            <RunnerInTeam
              playerEvent={playerEvent}
              eventClass={eventClass}
              onOpenRunnerSelect={onOpenRunnerSelect}
            />
          </TableRow>
        );
      return (
        <TableRow key={i}>
          <RunnerInTeam
            onRemoveRunnerFromTeam={onRemoveRunnerFromTeam}
            runner={runner}
            playerEvent={playerEvent}
            eventClass={eventClass}
          />
        </TableRow>
      );
    });
  }

  render() {
    const { colapsed } = this.props;

    return (
      <div className={colapsed ? styles.colapsed : null}>
        <Table
          componentStyle={colapsed ? styles.overflowHidden : null}
          tableHeader={["Leg", "Name", "Club", "Previous results", "actions"]}
        >
          {this.team}
        </Table>
      </div>
    );
  }
}

export default TeamTable;
