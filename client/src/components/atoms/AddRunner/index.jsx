import React from "react";
import { connect } from "redux-zero/react";

import actions from "../../../store/actions/index";

class AddRunner extends React.Component {
  render() {
    const { openRunnerSelect } = this.props;

    return (
      <li className="add-new-runner" onClick={() => openRunnerSelect()}>
        Add runner…
      </li>
    );
  }
}

const mapToProps = ({ openRunnerSelect }) => ({
  openRunnerSelect
});

export default connect(
  mapToProps,
  actions
)(AddRunner);
