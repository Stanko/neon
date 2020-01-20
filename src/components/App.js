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
    const { setGlobalState } = this.props;

    setGlobalState({ debug: false }, () => {
      this.setState({
        downloadLink: `data:application/octet-stream;base64,${btoa(
          this.svgElement ? this.svgElement.outerHTML : null
        )}`
      });
    });
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
      searchRange,
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
          <rect
            x="0"
            y="0"
            width={imageWidth}
            height={imageHeight}
            fill="#232528"
          />
          {debug && <Grid {...this.props} />}
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line}
              strokeWidth={line.strokeWidth}
              color={line.color}
            />
          ))}
          {debug && <Vectors vectors={vectors} blockSize={blockSize} />}
        </svg>
        <button onClick={this.generateDownloadLink}>
          Generate SVG download
        </button>
        {downloadLink && (
          <a
            className="Image-download"
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
    );
  }
}
