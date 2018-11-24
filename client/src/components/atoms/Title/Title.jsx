import React from "react";

import styles from "./style.module.css";

class Title extends React.Component {
  render() {
    const { title } = this.props;

    return <h1 className={styles.title}>{title}</h1>;
  }
}

export default Title;
