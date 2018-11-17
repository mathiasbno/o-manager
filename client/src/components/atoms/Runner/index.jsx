import React from "react";

class Runner extends React.Component {
  render() {
    const { runner } = this.props;

    return (
      <li className="team-member">
        <h3 className="name">{runner.name.given}</h3>
        <span className="metadata">(7. leg – 1. place)</span>
        {/* <span className="price">-{runner.price[0].cost}p</span> */}
      </li>
    );
  }
}

export default Runner;
