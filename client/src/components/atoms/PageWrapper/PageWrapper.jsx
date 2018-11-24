import React from "react";

import styles from "./style.module.css";

class PageWrapper extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.innerWrapper}>{children}</div>
      </div>
    );
  }
}

export default PageWrapper;
