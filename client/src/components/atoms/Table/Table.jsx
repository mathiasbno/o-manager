import React from "react";

import TeamTableHeader from "../TeamTableHeader/TeamTableHeader";

import style from "./style.module.css";

class Table extends React.Component {
  render() {
    const { children, componentStyle, tableHeader, scroll } = this.props;

    return (
      <div className={`${style.table} ${componentStyle ? componentStyle : ""}`}>
        <TeamTableHeader titles={tableHeader} />
        <div className={scroll ? style.tableContentScroll : null}>
          {children}
        </div>
      </div>
    );
  }
}

export default Table;
