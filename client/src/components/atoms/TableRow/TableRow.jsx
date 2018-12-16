import React from "react";

import style from "./style.module.css";

class TableRow extends React.Component {
  render() {
    const { children } = this.props;

    return <div className={style.tableRow}>{children}</div>;
  }
}

export default TableRow;
