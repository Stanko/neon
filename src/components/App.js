import React, { Component, Fragment } from "react";

import Grid from './Grid';
import Vectors from './Vectors';
import Line from './Line';

import generateVectors from '../utils/generate-vectors';
import generateLine from '../utils/generate-line';

export default class App extends Component {
  constructor() {
    super();

    const gridSize = 15;
    const gridStep = 50;
    const maxVectorVelocity = gridStep;

    this.state = {
      debug: false,
      gridSize,
      gridStep,
      lines: [],
      maxVectorVelocity,
      svgSize: gridSize * gridStep,
      vectors: generateVectors(gridSize, maxVectorVelocity),
    };
  }

  toggleDebug = () => {
    const {
      debug,
    } = this.state;

    this.setState({
      debug: !debug,
    });
  }

  regenerateVectors = () => {
    const {
      gridSize,
      maxVectorVelocity,
    } = this.state;

    this.setState({
      vectors: generateVectors(gridSize, maxVectorVelocity),
      lines: [],
    });
  }

  generateLines = () => {
    const {
      gridSize, 
      gridStep,
      svgSize,
      vectors,
    } = this.state;
    
    const lines = [];

    for (let i = 0; i < 100; i++) {
      const startingPoint = {
        x: Math.round(Math.random() * svgSize / 4) + 5,
        y: Math.round(Math.random() * (svgSize - 10)) + 5,      
      };

      lines.push(generateLine(startingPoint, vectors, gridSize, gridStep));
    }

    this.setState({
      lines,
    });
  }

  addLine = e => {
    const {
      lines,
      vectors, 
      gridSize, 
      gridStep,
      svgSize,
    } = this.state;

    const rect = this.svgElement.getBoundingClientRect();
    const x = e.pageX - (rect.left + window.pageXOffset);
    const y = e.pageY - (rect.top + window.pageYOffset);
    const factor = rect.width / svgSize;
  
    const startingPoint = {
      x: x / factor,
      y: y / factor
    };

    const line = generateLine(startingPoint, vectors, gridSize, gridStep);

    this.setState({
      lines: [...lines, line]
    })
  }

  render() {
    const {
      debug,
      gridSize,
      gridStep,
      svgSize,
      vectors,
      lines,
    } = this.state;

    return (
      <div className="App">
        <button onClick={ this.toggleDebug }>Toggle debug mode</button>
        <button onClick={ this.regenerateVectors }>Regenerate vectors</button>
        <button onClick={ this.generateLines }>Generate lines</button>
        <svg 
          viewBox={ `0 0 ${ svgSize } ${ svgSize }` }
          onClick={ this.addLine }
          ref={ el => this.svgElement = el }
        >
          { debug &&
            <Fragment>
              <Grid 
                gridSize={ gridSize }
                svgSize={ svgSize }
                gridStep={ gridStep }
              /> 
              <Vectors 
                vectors={ vectors }
                gridStep={ gridStep }
              />
            </Fragment> }
            { lines.map((line, index) => (
                <Line 
                  key={ index } 
                  points={ line }
                  strokeWidth={ line.strokeWidth }
                />
              )) }
        </svg>
      </div>
    );
  }
}