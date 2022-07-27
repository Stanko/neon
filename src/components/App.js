import React, { Component, Fragment } from 'react';

import Line from './Line';
import { saveAs } from 'file-saver';

import generateVectors from '../utils/generate-vectors';
import generateLines from '../utils/generate-lines';
import random from '../utils/random';

export default class Image extends Component {
  constructor(props) {
    super(props);

    const {
      numberOfLines,
      blockCount,
      blockSize,
      imageSize,
      searchRange,
      maxVectorVelocity,
    } = props;

    const vectors = generateVectors(blockCount, blockCount, maxVectorVelocity);

    const circles = [];

    for (let i = 1; i < 2000; i++) {
      circles.push({
        x: fxrand() * imageSize,
        y: fxrand() * imageSize,
        r: random(0.3, 2),
        opacity: random(0.01, 0.15),
      });
    }

    this.state = {
      lines: generateLines(
        numberOfLines,
        blockCount,
        blockCount,
        blockSize,
        imageSize,
        imageSize,
        vectors,
        searchRange
      ),
      circles,
    };

    this.handleKeyPres = this.handleKeyPres.bind(this);
  }

  componentDidMount() {
    let index = 0;
    const lines = document.querySelectorAll('.lines path');

    lines.forEach((line) => {
      line.style.strokeDasharray = line.getTotalLength();
      line.style.strokeDashoffset = line.getTotalLength();
    });

    const STEP = 10;
    const TRANSITION_DURATION = 500;

    function animate() {
      requestAnimationFrame(() => {
        for (let i = index; i < index + STEP && i < lines.length; i++) {
          const line = lines[i];

          if (line) {
            line.style.strokeDashoffset = 0;
          }
        }

        index += STEP;

        if (index < lines.length + STEP) {
          animate();
        } else {
          setTimeout(() => {
            fxpreview();
          }, TRANSITION_DURATION);
        }
      });
    }

    document.querySelector('.lines').classList.add('animate-lines');
    animate();

    window.addEventListener('keydown', this.handleKeyPres);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPres);
  }

  handleKeyPres(e) {
    if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      this.downloadSVG();
    }
  }

  downloadSVG = () => {
    setTimeout(() => {
      const svg = this.svgElement ? this.svgElement.outerHTML : null;

      const name = `neon-${fxhash}.svg`;
      saveAs(`data:application/octet-stream;base64,${btoa(svg)}`, name);
    }, 0);
  };

  render() {
    const { imageSize } = this.props;

    const { lines, circles } = this.state;

    const padding = imageSize / 5;
    const svgSize = imageSize + 2 * padding;

    return (
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        ref={(el) => (this.svgElement = el)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width={svgSize}
          height={svgSize}
          fill="#131317"
          stroke="none"
        />
        <rect
          x={padding}
          y={padding}
          width={imageSize}
          height={imageSize}
          stroke="#444"
          strokeWidth="1"
          fill="none"
        />
        <g transform={`translate(${padding} ${padding})`} className="lines">
          <g id="lines">
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                d={line.d}
                circles={line.circles}
                strokeWidth={line.strokeWidth}
                color={line.color}
              />
            ))}
          </g>
          <g id="circles" fill="white">
            {circles.map((circle, index) => {
              return (
                <circle
                  key={index}
                  cx={circle.x}
                  cy={circle.y}
                  r={circle.r}
                  style={{ opacity: circle.opacity }}
                />
              );
            })}
          </g>
        </g>
      </svg>
    );
  }
}
