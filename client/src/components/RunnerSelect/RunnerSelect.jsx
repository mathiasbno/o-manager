import React from "react";
import { connect } from "redux-zero/react";

import actions from "../../store/actions/index";

import Card from "../atoms/Card/Card";
import TableRow from "../atoms/TableRow/TableRow";
import Table from "../atoms/Table/Table";
import RunnerInSelect from "../atoms/RunnerInSelect/RunnerInSelect";

import style from "./style.module.css";

class RunnerSelect extends React.Component {
  componentDidMount() {
    const { runnerSelect, getrunners } = this.props;

    // TODO: Use event id that is passed down
    if (!runnerSelect.runners.length) getrunners("5be879c7863b33943c36d248");
  }

  getRunners() {
    const { runnerSelect, onAddRunnerToTeam } = this.props;

    return runnerSelect.runners.map(function(runner, i) {
      return (
        <TableRow key={i}>
          <RunnerInSelect
            runner={runner}
            onAddRunnerToTeam={onAddRunnerToTeam}
          />
        </TableRow>
      );
    });
  }

  render() {
    const { closeRunnerSelect } = this.props;

    return (
      <div className={style.selectOverlay}>
        <Card componentStyle={style.selectWrapper}>
          <span onClick={() => closeRunnerSelect()}>Lukk</span>
          <h2>Add runner</h2>
          <Table
            componentStyle={style.selectTable}
            tableHeader={[
              "Price",
              "Name",
              "Club",
              "Previous results",
              "actions"
            ]}
            scroll
          >
            {this.getRunners()}
          </Table>
        </Card>
      </div>
    );
  }
}

const mapToProps = ({ runnerSelect, closeRunnerSelect }) => ({
  runnerSelect,
  closeRunnerSelect
});

export default connect(
  mapToProps,
  actions
)(RunnerSelect);
