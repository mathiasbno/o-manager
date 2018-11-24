import React from "react";

import Button from "../Button/Button";
import style from "./style.module.css";

class Runner extends React.Component {
  render() {
    const { runner } = this.props;

    return (
      <div className={style.runner}>
        {runner ? (
          <React.Fragment>
            <span className={style.leg}>1</span>
            <h3 className="name">{runner.name.given}</h3>
            <span className="metadata">(7. leg – 1. place)</span>
            {/* <span className="price">-{runner.price[0].cost}p</span> */}
          </React.Fragment>
        ) : null}
        {!runner ? (
          <React.Fragment>
            <span className={style.number}>1</span>
            <h3 className={style.noRunner}>No runner selected…</h3>
            <div className={style.actions}>
              <Button>Add runner</Button>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default Runner;
