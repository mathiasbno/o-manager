import React from "react";
import { connect } from "redux-zero/react";

import { padArray } from "../helper/helpers";
import AddRunner from "../components/AddRunner";
import Runner from "../components/Runner";

class Team extends React.Component {
  get team() {
    const { team } = this.props;
    const paddedArray = padArray(team, 10, null);

    console.log(paddedArray);

    return paddedArray.map((runner, i) => {
      if (runner == null) return <AddRunner key={i} />;
      return <Runner runner={runner} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Tiomila i Östra Göinge</h1>
        <div className="event-wrapper">
          <h2 className="event-name">10MILA KAVLEN</h2>
          <div>
            <span className="cash">30000p</span>
            <span>Remaining budget</span>
          </div>
        </div>
        <ul className="team">{this.team}</ul>
      </div>
    );
  }
}

const mapToProps = ({ team }) => ({
  team
});

export default connect(mapToProps)(Team);
