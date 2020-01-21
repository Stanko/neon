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
      numberOfLines: 200,
      numberOfRows: 15,
      searchRange: 5,
      maxVectorVelocity: 50,
      vectorsSeed: getRandomString(),
      linesSeed: getRandomString(),
      colorsSeed: getRandomString(),
      ...this.getStateFromHash()
    };

    window.addEventListener("hashchange", this.handleHashChange);
  }

  componentDidMount() {
    this.setHash();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }

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

  setHash = (partialState = {}) => {
    const hashState = {
      ...this.state,
      ...partialState,
    };

    window.location.hash = HASH_PARAMS.reduce(
      (hash, key) => (hash += `/${hashState[key]}`),
      ""
    );
  }

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

    return (
      <div className="App">
        <div className="Controls">
          <Control
            name="debug"
            value={debug}
            type="checkbox"
            setState={this.setHash}
          />
          <Control
            name="numberOfColumns"
            value={numberOfColumns}
            type="range"
            min={5}
            max={20}
            step={1}
            setState={this.setHash}
          />
          <Control
            name="numberOfRows"
            value={numberOfRows}
            type="range"
            min={5}
            max={20}
            step={1}
            setState={this.setHash}
          />
          <Control
            name="blockSize"
            value={blockSize}
            type="range"
            min={10}
            max={100}
            step={5}
            setState={this.setHash}
          />
          <Control
            name="maxVectorVelocity"
            value={maxVectorVelocity}
            type="range"
            min={10}
            max={100}
            step={5}
            setState={this.setHash}
          />
          <Control
            name="numberOfLines"
            value={numberOfLines}
            type="range"
            min={10}
            max={500}
            step={10}
            setState={this.setHash}
          />
          <Control
            name="searchRange"
            value={searchRange}
            type="range"
            min={1}
            max={10}
            step={0.5}
            setState={this.setHash}
          />
          <Control
            name="vectorsSeed"
            value={vectorsSeed}
            type="text"
            setState={this.setHash}
          />
          <Control
            name="linesSeed"
            value={linesSeed}
            type="text"
            setState={this.setHash}
          />
          <Control
            name="colorsSeed"
            value={colorsSeed}
            type="text"
            setState={this.setHash}
          />

          <div className='Controls-buttons'>
            <button onClick={this.generateNewVectorSeed}>Regenerate vectors</button>
            <button onClick={this.generateNewLinesSeed}>Regenerate lines</button>
            <button onClick={this.generateNewColorsSeed}>Regenerate colors</button>
            <button className='Controls-reset' onClick={this.reset}>Reset</button>
          </div>
          
        </div>

        <App
          {...this.state}
          imageWidth={blockSize * numberOfColumns}
          imageHeight={blockSize * numberOfRows}
          setGlobalState={this.setHash}
        />
      </div>
    );
  }
}
