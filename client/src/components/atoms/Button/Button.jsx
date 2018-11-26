import React from "react";

import style from "./style.module.css";

class Button extends React.Component {
  render() {
    const { children, large, center, color, onClick } = this.props;

    const buttonColor = color === "red" ? style.redButton : "";
    const buttonSize = large ? style.largeButton : style.normalButton;
    const _center = center ? style.center : "";

    return (
      <button
        onClick={onClick}
        className={[buttonSize, buttonColor, _center].join(" ")}
      >
        {children}
      </button>
    );
  }
}

export default Button;
