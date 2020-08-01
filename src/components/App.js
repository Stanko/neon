import React, { Component, Fragment } from "react";

import Grid from "./Grid";
import Vectors from "./Vectors";
import Line from "./Line";
import { saveAs } from "file-saver";

import generateVectors from "../utils/generate-vectors";
import generateLines from "../utils/generate-lines";

export default class Image extends Component {
  downloadSVG = () => {
    const { debug, setGlobalState, imageWidth, imageHeight } = this.props;

    const xFrameWidth = imageWidth / 5;
    const yFrameWidth = imageHeight / 5;

    const frameWidth = xFrameWidth > yFrameWidth ? xFrameWidth : yFrameWidth;
    const width = imageWidth + 2 * frameWidth;
    const height = imageHeight + 2 * frameWidth;

    let timeout = 0;

    if (debug) {
      // To give browser time to rerender the svg
      timeout = 100;
      setGlobalState({ debug: false });
    }

    setTimeout(() => {
      const svg = `
        <svg
          viewBox="0 0 ${width} ${height}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="${width}"
            height="${height}"
            fill="#1a1c1e"
            stroke="none"
          />
          <rect
            x="${frameWidth}"
            y="${frameWidth}"
            width="${imageWidth}"
            height="${imageHeight}"
            stroke="#444"
            strokeWidth="1"
            fill="none"
          />
          <g transform="translate(${frameWidth} ${frameWidth})">
            ${this.svgElement ? this.svgElement.innerHTML : null}
          </g>
        </svg>`;

      const name =
        'neon-' + window.location.hash.replace("#/", "").replace(/\//g, "-") + ".svg";
      saveAs(`data:application/octet-stream;base64,${btoa(svg)}`, name);
    }, timeout);
  };

  render() {
    const {
      blockSize,
      debug,
      imageHeight,
      imageWidth,
      linesSeed,
      maxVectorVelocity,
      numberOfColumns,
      numberOfRows,
      vectorsSeed,
      numberOfLines,
      colorsSeed,
      searchRange,
      plotting,
    } = this.props;

    const vectors = generateVectors(
      vectorsSeed,
      numberOfColumns,
      numberOfRows,
      maxVectorVelocity
    );

    this.vectors = vectors;

    const lines = generateLines(
      linesSeed,
      numberOfLines,
      numberOfColumns,
      numberOfRows,
      blockSize,
      imageWidth,
      imageHeight,
      vectors,
      colorsSeed,
      searchRange,
      plotting
    );

    this.lines = lines;

    return (
      <div className="Image">
        <svg
          viewBox={`0 0 ${imageWidth} ${imageHeight}`}
          ref={el => (this.svgElement = el)}
          xmlns="http://www.w3.org/2000/svg"
        >
          {debug && <Grid {...this.props} />}
          {debug && <Vectors vectors={vectors} blockSize={blockSize} />}
          {lines.map((lineGroup, index) => (
            <g key={index}>
              {lineGroup.map((line, index) => (
                <Line
                  key={index}
                  points={line}
                  strokeWidth={line.strokeWidth}
                  color={line.color}
                />
              ))}
            </g>
          ))}
        </svg>

        <div className="Image-downloadSection">
          <button className="Image-generateDownload" onClick={this.downloadSVG}>
            Download SVG
          </button>
          <div className="Image-downloadNote">
            Downloading files should be fixed. If it fails, please open an issue on GitHub with the url that failed.
            Meanwhile, try Firefox or Safari (or manually copy SVG's code from dev tools).
          </div>
        </div>
      </div>
    );
  }
}
