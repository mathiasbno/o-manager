import React from "react";

import style from "./style.module.css";

class TeamTableHeader extends React.Component {
  get titles() {
    const { titles } = this.props;

    return titles.map((title, i) => {
      return (
        <span key={`title-${i}`} className={style.title}>
          {title}
        </span>
      );
    });
  }

  render() {
    return <div className={style.tableHeader}>{this.titles}</div>;
  }
}

export default TeamTableHeader;
