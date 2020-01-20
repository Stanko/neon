import React, { Component, Fragment } from "react";

import seedrandom from 'seedrandom';

import Grid from './Grid';
import Vectors from './Vectors';
import Line from './Line';

import generateVectors from '../utils/generate-vectors';
import generateLine from '../utils/generate-line';

export default class App extends Component {
  constructor() {
    super();

    const gridSizeX = 15;
    const gridSizeY = 15;
    const gridStep = 50;
    const maxVectorVelocity = gridStep;

    const seed = Math.random().toString(36).substring(2);

    seedrandom(seed, { global: true });

    this.state = {
      debug: false,
      gridSizeX,
      gridSizeY,
      gridStep,
      lines: [],
      maxVectorVelocity,
      svgWidth: gridSizeX * gridStep,
      svgHeight: gridSizeY * gridStep,
      vectors: generateVectors(gridSizeX, gridSizeY, maxVectorVelocity),
      selectedVector: {},
      seed,
      downloadLink: null,
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

  componentDidMount() {
    this.generateLines();
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

  regenerateVectors = (e, keepOldSeed) => {
    const {
      gridSizeX,
      gridSizeY,
      maxVectorVelocity,
    } = this.state;

    const newState = {};

    if (!keepOldSeed) {
      const seed = Math.random().toString(36).substring(2);
      seedrandom(seed, { global: true });
      newState.seed = seed;
    } 

    this.setState({
      ...newState,
      vectors: generateVectors(gridSizeX, gridSizeY, maxVectorVelocity),
      downloadLink: null,
    }, this.recalculateLines);
  }

  generateLines = () => {
    const {
      gridSizeX,
      gridSizeY, 
      gridStep,
      svgWidth,
      svgHeight,
      vectors,
    } = this.state;
    
    const lines = [];

    for (let i = 0; i < 200; i++) {
      const startingPoint = {
        x: Math.round(Math.random() * (svgWidth - 10)) + 5,      
        y: Math.round(Math.random() * (svgHeight - 10)) + 5,      
      };

      lines.push(generateLine(startingPoint, vectors, gridSizeX, gridSizeY, gridStep));
    }

    this.setState({
      lines,
      downloadLink: null,
    });
  }

  getSvgCoords(e) {
    const {
      svgWidth,
      svgHeight,
    } = this.state;

    const rect = this.svgElement.getBoundingClientRect();
    const x = e.pageX - (rect.left + window.pageXOffset);
    const y = e.pageY - (rect.top + window.pageYOffset);
    const factorX = rect.width / svgWidth;
    const factorY = rect.height / svgHeight;
  
    return {
      x: x / factorX,
      y: y / factorY
    };
  }

  addLine = e => {
    const {
      lines,
      vectors, 
      gridSizeX,
      gridSizeY, 
      gridStep,
      debug,
    } = this.state;

    if (debug) {
      return;
    }

    const startingPoint = this.getSvgCoords(e);

    const line = generateLine(startingPoint, vectors, gridSizeX, gridSizeY, gridStep);

    this.setState({
      lines: [...lines, line]
    })
  }

  recalculateLines = () => {
    const {
      lines,
      vectors, 
      gridSizeX, 
      gridSizeY,
      gridStep,
    } = this.state;

    const newLines = lines.map(line => {
      return generateLine(line[0], vectors, gridSizeX, gridSizeY, gridStep, line.strokeWidth);
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

  setSeed = e => {
    e.preventDefault();

    const seed = this.seedInput.value && this.seedInput.value.trim();

    seedrandom(seed, { global: true });

    if (seed) {
      this.seedInput.value = '';

      this.setState({
        seed,
      }, () => this.regenerateVectors(null, true));
    }
  }

  generateDownload = () => {
    this.setState({
      debug: false,
      downloadLink: `data:application/octet-stream;base64,${ btoa(this.svgElement.outerHTML) }`,
    });
  }
  
  render() {
    const {
      debug,
      gridSizeX,
      gridSizeY,
      gridStep,
      svgWidth,
      svgHeight,
      vectors,
      lines,
      selectedVector,
      seed,
      downloadLink,
    } = this.state;

    return (
      <div className="App">
        <div className="Controls">
          <form onSubmit={ this.setSeed }>
            <p>seed: { seed }</p>
            <input type="text" ref={ el => this.seedInput = el } />
            <button>Set seed</button>
          </form>

          <button type="button" onClick={ this.toggleDebug }>Toggle debug mode</button>
          <button type="button" onClick={ this.regenerateVectors }>Regenerate vectors</button>
          <button type="button" onClick={ this.generateLines }>Regenerate lines</button>
          <br /> 
          <button type="button" onClick={ this.generateDownload }>Generate download</button>
          { downloadLink && 
            <a 
              download={`seed-${ seed }.svg`} 
              href={ downloadLink }
              onClick={ () => this.setState({ downloadLink: null }) }
            >
              Download SVG
            </a> }
        </div>
  
        <svg 
          viewBox={ `0 0 ${ svgWidth } ${ svgHeight }` }
          onClick={ this.addLine }
          onMouseDown={ this.handleMouseDown }
          onMouseUp={ this.handleMouseUp }
          onMouseMove={ this.handleMouseMove }
          ref={ el => this.svgElement = el }
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width={ svgWidth } height={ svgHeight } fill="#232528" />
          { debug &&
            <Grid 
              gridStep={ gridStep }
              svgWidth={ svgWidth }
              svgHeight={ svgHeight }
              gridSizeX={ gridSizeX }
              gridSizeY={ gridSizeY }
            /> }
          { lines.map((line, index) => (
              <Line 
                key={ index } 
                points={ line }
                strokeWidth={ line.strokeWidth }
              />
            )) }
          { debug &&
            <Vectors
              selectVector={ this.selectVector }
              selectedVector={ selectedVector }
              vectors={ vectors }
              gridStep={ gridStep }
            /> }
        </svg>
      </div>
    );
  }
}