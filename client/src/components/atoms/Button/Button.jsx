import React from "react";

import style from "./style.module.css";

class Button extends React.Component {
  render() {
    const { children, large, center, onClick } = this.props;

    const buttonSize = large ? style.largeButton : style.normalButton;
    const _center = center ? style.center : "";

    return (
      <button onClick={onClick} className={[buttonSize, _center].join(" ")}>
        {children}
      </button>
    );
  }
}

export default Button;
