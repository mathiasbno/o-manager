import React from "react";

class TextInput extends React.Component {
  render() {
    const { children, onClick } = this.props;

    return (
      <input onClick={onClick} type="text">
        {children}
      </input>
    );
  }
}

export default TextInput;
