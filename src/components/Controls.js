import React, { Component, Fragment } from "react";

import App from "./App";
import Control from "./Control";

const HASH_PARAMS = [
  "debug",
  "numberOfColumns",
  "numberOfRows",
  "blockSize",
  "maxVectorVelocity",
  "numberOfLines",
  "searchRange",
  "vectorsSeed",
  "linesSeed",
  "colorsSeed",
];

const BOOLEANS_PARAMS = ["debug"];

function getRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

export default class Controls extends Component {
  constructor() {
    super();

    this.state = {
      blockSize: 50,
      debug: false,
      numberOfColumns: 15,
      numberOfLines: 100,
      numberOfRows: 15,
      searchRange: 5,
      maxVectorVelocity: 50,
      vectorsSeed: getRandomString(),
      linesSeed: getRandomString(),
      colorsSeed: getRandomString(),
      ...this.getStateFromHash()
    };

    // window.addEventListener("hashchange", this.handleHashChange);
  }

  // componentWillUnmount() {
  //   window.removeEventListener("hashchange", this.handleHashChange);
  // }

  getStateFromHash() {
    const params = window.location.hash.replace("#", "").split("/");
    params.shift();

    const state = {};

    if (params.length !== HASH_PARAMS.length) {
      return;
    }

    let invalid = false;

    HASH_PARAMS.forEach((key, index) => {
      if (typeof params[index] !== "undefined") {
        state[key] = BOOLEANS_PARAMS.includes(key)
          ? params[index] === "true"
          : params[index];
      } else {
        invalid = true;
      }
    });

    if (invalid) {
      return;
    }

    return state;
  }

  handleHashChange = () => {
    this.setState(this.getStateFromHash);
  };

  generateNewVectorSeed = () => {
    this.setState({
      vectorsSeed: getRandomString(),
    });
  }

  generateNewLinesSeed = () => {
    this.setState({
      linesSeed: getRandomString(),
    });
  }

  generateNewColorsSeed = () => {
    this.setState({
      colorsSeed: getRandomString(),
    });
  }

  reset = () => {
    window.location.hash = '';
    window.location.reload();
  }

  render() {
    const {
      blockSize,
      debug,
      linesSeed,
      maxVectorVelocity,
      numberOfColumns,
      numberOfLines,
      numberOfRows,
      searchRange,
      vectorsSeed,
      colorsSeed,
    } = this.state;

    const setState = this.setState.bind(this);

    window.location.hash = HASH_PARAMS.reduce(
      (hash, key) => (hash += `/${this.state[key]}`),
      ""
    );

    return (
      <div className="App">
        <div className="Controls">
          <Control
            name="debug"
            value={debug}
            type="checkbox"
            setState={setState}
          />
          <Control
            name="numberOfColumns"
            value={numberOfColumns}
            type="range"
            min={5}
            max={20}
            step={1}
            setState={setState}
          />
          <Control
            name="numberOfRows"
            value={numberOfRows}
            type="range"
            min={5}
            max={20}
            step={1}
            setState={setState}
          />
          <Control
            name="blockSize"
            value={blockSize}
            type="range"
            min={10}
            max={100}
            step={5}
            setState={setState}
          />
          <Control
            name="maxVectorVelocity"
            value={maxVectorVelocity}
            type="range"
            min={10}
            max={100}
            step={5}
            setState={setState}
          />
          <Control
            name="numberOfLines"
            value={numberOfLines}
            type="range"
            min={10}
            max={500}
            step={10}
            setState={setState}
          />
          <Control
            name="searchRange"
            value={searchRange}
            type="range"
            min={1}
            max={10}
            step={0.5}
            setState={setState}
          />
          <Control
            name="vectorsSeed"
            value={vectorsSeed}
            type="text"
            setState={setState}
          />
          <Control
            name="linesSeed"
            value={linesSeed}
            type="text"
            setState={setState}
          />
          <Control
            name="colorsSeed"
            value={colorsSeed}
            type="text"
            setState={setState}
          />

          <button onClick={this.generateNewVectorSeed}>Regenerate vectors</button>
          <button onClick={this.generateNewLinesSeed}>Regenerate lines</button>
          <button onClick={this.generateNewColorsSeed}>Regenerate colors</button>
          <button onClick={this.reset}>Reset</button>
        </div>

        <App
          {...this.state}
          imageWidth={blockSize * numberOfColumns}
          imageHeight={blockSize * numberOfRows}
          setGlobalState={setState}
        />
      </div>
    );
  }
}
