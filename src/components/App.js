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
      debug: true,
      gridSize,
      gridStep,
      lines: [],
      maxVectorVelocity,
      svgSize: gridSize * gridStep,
      vectors: generateVectors(gridSize, maxVectorVelocity),
      selectedVector: {},
    };

    const ESC = 27;
    window.addEventListener('keydown', e => {
      if (e.keyCode === ESC ){
        e.preventDefault();
        this.setState({
          selectedVector: {},
        });
      }
    });
  }

  toggleDebug = () => {
    const {
      debug,
    } = this.state;

    this.setState({
      debug: !debug,
    });
  }

  selectVector = (x, y) => {
    this.setState({
      selectedVector: { x, y },
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

  getSvgCoords(e) {
    const {
      svgSize,
    } = this.state;

    const rect = this.svgElement.getBoundingClientRect();
    const x = e.pageX - (rect.left + window.pageXOffset);
    const y = e.pageY - (rect.top + window.pageYOffset);
    const factor = rect.width / svgSize;
  
    return {
      x: x / factor,
      y: y / factor
    };
  }

  addLine = e => {
    const {
      lines,
      vectors, 
      gridSize, 
      gridStep,
      debug,
    } = this.state;

    if (debug) {
      return;
    }

    const startingPoint = this.getSvgCoords(e);

    const line = generateLine(startingPoint, vectors, gridSize, gridStep);

    this.setState({
      lines: [...lines, line]
    })
  }

  recalculateLines = () => {
    const {
      lines,
      vectors, 
      gridSize, 
      gridStep,
      debug,
    } = this.state;

    const newLines = lines.map(line => {
      return generateLine(line[0], vectors, gridSize, gridStep, line.strokeWidth);
    });

    this.setState({
      lines: newLines,
    });
  }

  handleMouseDown = e => {
    const {
      debug,
      selectedVector,
    } = this.state;

    if (debug && selectedVector) {
      this.setState({
        mousePressed: true,
      });
    }
  }

  handleMouseUp = e => {
    this.setState({
      mousePressed: false,
    });
  }

  handleMouseMove = e => {
    const {
      debug,
      mousePressed,
      selectedVector,
      vectors,
      gridStep,
    } = this.state;

    if (!debug || !mousePressed) {
      return;
    }

    const endPoint = this.getSvgCoords(e);
    const vector = {
      x: endPoint.x - selectedVector.x * gridStep,
      y: endPoint.y - selectedVector.y * gridStep,
    };
    vectors[selectedVector.x][selectedVector.y] = vector;

    clearTimeout(this.recalculateLinesTimeout);
    this.setState({
      vectors: [ ...vectors ]
    }, () => {
      this.recalculateLinesTimeout = setTimeout(this.recalculateLines, 250);
    });
  }
  
  render() {
    const {
      debug,
      gridSize,
      gridStep,
      svgSize,
      vectors,
      lines,
      selectedVector,
    } = this.state;

    return (
      <div className="App">
        <button onClick={ this.toggleDebug }>Toggle debug mode</button>
        <button onClick={ this.regenerateVectors }>Regenerate vectors</button>
        <button onClick={ this.generateLines }>Generate lines</button>
        <svg 
          viewBox={ `0 0 ${ svgSize } ${ svgSize }` }
          onClick={ this.addLine }
          onMouseDown={ this.handleMouseDown }
          onMouseUp={ this.handleMouseUp }
          onMouseMove={ this.handleMouseMove }
          ref={ el => this.svgElement = el }
        >
          { lines.map((line, index) => (
              <Line 
                key={ index } 
                points={ line }
                strokeWidth={ line.strokeWidth }
              />
            )) }
          { debug &&
            <Fragment>
              <Grid 
                gridSize={ gridSize }
                svgSize={ svgSize }
                gridStep={ gridStep }
              /> 
              <Vectors
                selectVector={ this.selectVector }
                selectedVector={ selectedVector }
                vectors={ vectors }
                gridStep={ gridStep }
              />
            </Fragment> }
        </svg>
      </div>
    );
  }
}