import React, { Component, Fragment } from "react";

import Grid from "./Grid";
import Vectors from "./Vectors";
import Line from "./Line";

import generateVectors from "../utils/generate-vectors";
import generateLines from "../utils/generate-lines";

export default class Image extends Component {
  state = {
    downloadLink: null
  };

  generateDownloadLink = () => {
    const { setGlobalState, imageWidth, imageHeight } = this.props;

    const xFrameWidth = imageWidth / 5;
    const yFrameWidth = imageHeight / 5;

    const frameWidth = xFrameWidth > yFrameWidth ? xFrameWidth : yFrameWidth;
    const width = imageWidth + 2 * frameWidth;
    const height = imageHeight + 2 * frameWidth;

    setGlobalState({ debug: false });

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
            ${ this.svgElement ? this.svgElement.innerHTML : null }
          </g>
        </svg>`;

      this.setState({
        downloadLink: `data:application/octet-stream;base64,${btoa(svg)}`
      });
    }, 100);
  };

  removeDownloadLink = () => {
    this.setState({ downloadLink: null });
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
      searchRange
    } = this.props;

    const { downloadLink } = this.state;

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
      searchRange
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
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line}
              strokeWidth={line.strokeWidth}
              color={line.color}
            />
          ))}
          
        </svg>

        <div className="Image-downloadSection">
          <button
            className="Image-generateDownload"
            onClick={this.generateDownloadLink}
          >
            Generate SVG download
          </button>
          {downloadLink && (
            <a
              className="Button Image-download"
              download={`${window.location.hash
                .replace("#/", "")
                .replace(/\//g, "-")}.svg`}
              href={downloadLink}
              onClick={this.removeDownloadLink}
            >
              Download SVG
            </a>
          )}
        </div>
      </div>
    );
  }
}
