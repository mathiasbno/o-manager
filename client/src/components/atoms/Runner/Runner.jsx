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
            <span className={style.number}>1</span>
            <h3 className={style.name}>{`${runner.name.given} ${
              runner.name.family
            }`}</h3>
            <span className={style.club}>{runner.club}</span>
            <ul className={style.previousResults}>
              <li>2018: 9th leg - 2nd best time</li>
              <li>2017: 8th leg - Best time</li>
            </ul>
            <div className={style.actions}>
              <Button color="red">Remove runner</Button>
            </div>
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
