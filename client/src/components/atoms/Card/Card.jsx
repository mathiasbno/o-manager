import React from "react";

import styles from "./style.module.css";

class Card extends React.Component {
  render() {
    const { children, componentStyle } = this.props;

    return (
      <div
        className={`${styles.cardWrapper} ${
          componentStyle ? componentStyle : ""
        }`}
      >
        {children}
      </div>
    );
  }
}

export default Card;
