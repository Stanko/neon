import React, { Component } from "react";

export default class Vectors extends Component {
  render() {
    const {
      blockSize,
      vectors,
    } = this.props;

    const vectorElements = [
      <marker 
        key="marker-arrow"
        id="marker-arrow" 
        viewBox="0 0 6 6" 
        refX="3" 
        refY="3"
        markerWidth="4" 
        markerHeight="4"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 6 3 L 0 6 Z" />
      </marker>,
      <marker 
        key="marker-circle"
        id="marker-circle" 
        viewBox="0 0 6 6" 
        markerWidth="3" 
        markerHeight="3"
        orient="auto-start-reverse"
      >
        <circle r="3" dx="3" dy="3" />
      </marker>
    ];

    vectors.forEach((verticalSet, x) => {
      verticalSet.forEach((vector, y) => {
        const xCoordinate = x * blockSize;
        const yCoordinate = y * blockSize;

        vectorElements.push(
          <path 
            key={ `vector-${ x }-${ y }` }
            className='Vector'
            d={ `M ${ xCoordinate } ${ yCoordinate } L ${ (xCoordinate + vector.x).toFixed(2) } ${ (yCoordinate + vector.y).toFixed(2) }` } 
            markerEnd='url(#marker-arrow)' 
          />
        );
      });
    });
    

    return vectorElements;
  }
}