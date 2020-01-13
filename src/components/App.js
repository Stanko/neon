import React, { Component, Fragment } from "react";

import Grid from './Grid';
import Vectors from './Vectors';
import Line from './Line';

import generateVectors from '../utils/generate-vectors';
import generateLine from '../utils/generate-line';

export default class App extends Component {
  constructor() {
    super();

    const gridSize = 10;
    const gridStep = 50;
    const maxVectorVelocity = gridStep;
    
    this.state = {
      debug: true,
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
      <div>
        <button onClick={ this.toggleDebug }>Toggle debug mode</button>
        <button onClick={ this.regenerateVectors }>Regenerate vectors</button>
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
            { lines.map(line => (
                <Line key={ line } points={ line } />
              )) }
        </svg>
      </div>
    );
  }
}