import React from "react";
import { connect } from "redux-zero/react";

import actions from "../../store/actions/index";

class RunnerSelect extends React.Component {
  componentDidMount() {
    const { runners, getrunners, event } = this.props;

    console.log(runners);

    if (!runners.length) getrunners(event);
  }

  render() {
    const { runners, closeRunnerSelect, addRunnerToTeam } = this.props;

    return (
      <div className="runner-select-wrapper">
        <span onClick={() => closeRunnerSelect()}>Lukk</span>
        <ul>
          {runners.map(function(runner, index) {
            return (
              <li key={index} onClick={() => addRunnerToTeam(runner)}>
                {runner.name.given}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapToProps = ({ runners, closeRunnerSelect, addRunnerToTeam }) => ({
  runners,
  closeRunnerSelect,
  addRunnerToTeam
});

export default connect(
  mapToProps,
  actions
)(RunnerSelect);
